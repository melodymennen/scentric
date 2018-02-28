const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const controller = require('./controller')
const stripe_ctrl = require('./stripe_controller.js')
const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET)
const socket = require('socket.io')
const massive = require('massive')
const multer = require('multer')
const axios = require('axios')
const AWS = require('aws-sdk')

require('dotenv').config()

const app = express()

const port = process.env.SERVER_PORT
const messages = []

app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
}).catch(error => {
    console.log('error', error)
})

app.use( express.static( `${__dirname}/../build` ) )
// const path = require('path')
// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// })

app.get('/api/products', controller.getAllProducts)
app.get('/api/display/:category', controller.getProductsByCategory)
app.get('/api/products/:product_id', controller.getProduct)
app.get('/api/scentfam/:category', controller.getProductsByScent)
app.post('/api/cart', controller.addToCart)
app.get('/api/cart', controller.getCart)
app.get('/api/cart/all', controller.getCartAll)
app.delete('/api/cart/:product_id', controller.removeFromCart)
app.patch('/api/cart', controller.decreaseCartQty)
app.delete('/api/cart', controller.deleteCart)
app.post('/api/updateuser', controller.updateUser)
app.post('/api/new-order', controller.addOrder)
app.get('/api/orders', controller.getOrdersByUser)
app.get('/api/orders/:order_id', controller.getOrder)
app.post('/api/product', controller.addProduct)
app.put(`/api/product/:id`, controller.editProduct)
app.delete(`/api/product/:id`, controller.deleteProduct)
app.post('/api/favorites', controller.addFavorite)
app.get('/api/favorites', controller.getFavorites)
app.get('/api/ordersall', controller.getAllOrders)
app.get('/api/allusers', controller.getAllUsers)
app.delete('/api/favorites/:product_id', controller.removeFavorite)
app.put('/api/logout', controller.logout)
app.get('/api/customers/admin', controller.getCustomers)
app.get('/api/admin/:id', controller.getProductAdmin)

app.get('/api/stripeConnect', stripe_ctrl.connect)
app.post('/api/finalize', stripe_ctrl.finalize)
app.post('/api/storeStripeAcct', stripe_ctrl.storeAcct)
app.post('/api/save-stripe-token', stripe_ctrl.paymentAPI)

app.post('/api/generatedId', (req, res) => {
    req.session.generatedId = req.body.generatedId
    res.send('nothing')
})

// Auth0 Login
app.post('/login', (req, res) => {
    const { userId } = req.body
    const auth0Url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`
    axios.get(auth0Url, {
        headers: {
            Authorization: 'Bearer ' + process.env.AUTH0_ACCESS_TOKEN
        }
    }).then(response => {
        const userData = response.data
        app.get('db').find_user(userData.user_id).then(users => {
            if(users.length){
                req.session.user = users[0]
                res.json({user: req.session.user})
            } else {
                app.get('db').create_user([userData.name, userData.email, userData.picture, userData.user_id, req.session.generatedId, false]).then(user => {
                    req.session.user = user[0]
                    res.json({user: req.session.user})
                }).catch(error => console.log('create user error',error))
            }
        }).catch(error => console.log('find user error',error))
    }).catch(error => {
        console.log('eror', error)
        res.status(500).json({ message: 'problemo' })
    })
})

app.get('/user-data', (req, res) => {
    if (req.session.user){
        res.status(200).send(req.session.user)
    } else {
        res.status(403)
    }
})

// Amazon S3 upload
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION
  })

  const s3 = new AWS.S3()
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 52428800
    }
  })

  app.post('/upload', upload.single('image_url'), (req, res) => {
    const fileName = req.file.originalname.split(' ').join('+')
  s3.putObject({
      Bucket: process.env.BUCKET,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: "image/png",
      ACL: 'public-read'
      }, (err) => {
      console.log('upload error', err)
      if (err) return res.status(400).send(err)
      res.send(`https://s3-${process.env.REGION}.amazonaws.com/${process.env.BUCKET}/${fileName}`)
  })
})

// Sockets
const io = socket(app.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}.`)))

io.on('connection', onConnect)

function onConnect(socket){
    socket.join('chat room')
    console.log('A user joined the chatroom')
    
    // Everyone including the sender
    
    socket.on('sendMessage', message => {
      // console.log('new message ', message)
      messages.push(message)
      // console.log('new array of messages', messages)
      io.in('chat room').emit('getMessage', messages)
    })
    
    // Gets the messages on connection
    
    socket.on('join', () => {
      socket.emit('getMessage', messages)
    })
    
    // Everyone but the sender
    
    socket.on('typing', name => {
      // console.log(name)
      socket.broadcast.emit('newTyper', name)
    })
    
    socket.on('stopTyping', name => {
      // console.log(name + ' stopped typing')
      socket.broadcast.emit('oldTyper', name)
    })
    
    socket.on('disconnect', () => {
      console.log('A user disconnected')
    })
}
