const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const controller = require('./controller');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}));

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
}).catch(error => {
    console.log('error', error)
});

app.get('/api/products', controller.getAllProducts)
app.get('/api/display/:category', controller.getProductsByCategory)
app.get('/api/products/:product_id', controller.getProduct)
app.post('/api/cart', controller.addToCart)
app.get('/api/cart', controller.getCart)



app.post('/login', (req, res) => {
    const { userId } = req.body
    const auth0Url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`
    axios.get(auth0Url, {
        headers: {
            Authorization: 'Bearer ' + process.env.AUTH0_ACCESS_TOKEN
        }
    }).then(response => {
        const userData = response.data
        req.session.user = {
            name: userData.name,
            email: userData.email,
            auth0_id: userData.user_id,
            pictureUrl: userData.picture
        }
        res.json({ user: req.session.user })
        app.get('db').find_user(userData.user_id).then(users => {
            if (!users.length) {
                app.get('db').create_user([userData.user_id, userData.email, userData.picture, userData.name]).then(() => {

                }).catch(error => {
                    console.log('error', error)
                })
            }
        })
    }).catch(error => {
        console.log('eror', error)
        res.status(500).json({ message: 'problemo' })
    })
})

app.get('/user-data', (req, res) => {
    res.json({ user: req.session.user })
})

const path = require('path')
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

const port = process.env.SERVER_PORT
app.listen(port, () => console.log('listening on port ' + port));