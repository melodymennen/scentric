require('dotenv').config()
const axios = require('axios')
const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET)


module.exports = {
    connect(req,res){
        const url = `https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write`
        
        res.status(200).send(url)
    },
    finalize(req,res){
        const {code} = req.body

        axios.post('https://connect.stripe.com/oauth/token', {
            client_secret: process.env.STRIPE_CLIENT_SECRET,
            code: req.body.code,
            grant_type: 'authorization_code'
        }).then(response => {
            res.status(200).send(response.data)
        }).catch(err => {
            console.log('Error finalizing connection:', err)
            res.status(500).send(err)
        })
    },
    storeAcct(req,res){
        const {stripeId} = req.body
        const userId = req.session.user.userid
        const db = req.app.get('db')

        db.updateStripeAcct([stripeId, userId])
        .then( () => {
            res.status(200).send()
        }).catch(() => res.status(500).send())
    },
    paymentAPI(req, res){
        const {source, currency, amount, acct, addresses, email} = req.body

        stripe.charges.create({source,currency,amount}, {stripe_account: acct}, (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).send({ error: stripeErr })
            } else {
                res.status(200).send({ success: stripeRes, addresses: addresses, email: email })
            }
        })
    }
}