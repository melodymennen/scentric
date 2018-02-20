const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const controller = require('./controller')
const stripe_ctrl = require('./stripe_controller.js')
const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET)
const massive = require('massive')
const axios = require('axios')
const AWS = require('aws-sdk')
const multer = require('multer')

require('dotenv').config()

const app = express()

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

app.get('/api/products', controller.getAllProducts)
app.get('/api/display/:category', controller.getProductsByCategory)
app.get('/api/products/:product_id', controller.getProduct)
app.get('/api/scentfam/:category', controller.getProductsByScent)
app.post('/api/cart', controller.addToCart)
app.get('/api/cart', controller.getCart)
app.delete('/api/cart/:product_id', controller.removeFromCart)
app.patch('/api/cart', controller.decreaseCartQty)
app.delete('/api/cart', controller.deleteCart)
app.post('/api/updateuser', controller.updateUser)
app.post('/api/new-order', controller.addOrder)
app.get('/api/orders', controller.getOrdersByUser)
app.get('/api/orders/:order_id', controller.getOrder)
app.post('/api/product', controller.addProduct)
app.post('/api/favorites', controller.addFavorite)
app.get('/api/favorites', controller.getFavorites)

app.get('/api/stripeConnect', stripe_ctrl.connect)
app.post('/api/finalize', stripe_ctrl.finalize)
app.post('/api/storeStripeAcct', stripe_ctrl.storeAcct)
app.post('/api/save-stripe-token', stripe_ctrl.paymentAPI)


app.post('/api/generatedId', (req, res) => {
    req.session.generatedId = req.body.generatedId
    res.send('nothing')
})

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
                app.get('db').create_user([userData.name, userData.email, userData.picture, userData.user_id, req.session.generatedId]).then(user => {
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
    res.json({ user: req.session.user })
})

// app.get('/user-data', (req, res) => {
//     if (req.session.user){
//         res.status(200).send(req.session.user)
//     } else {
//         res.status(403)
//     }
// })

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


const port = process.env.SERVER_PORT
app.listen(port, () => console.log('listening on port ' + port))