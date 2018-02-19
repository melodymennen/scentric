import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

class TakeMoney extends Component {
    constructor(){
        super()

        this.state = {
            orderComplete: false, 
            orderNumber: 0
        }
    }

    successPayment = data => {
        console.log('Payment Successful')
        // const body = {cart: this.props.cart.cart, subtotal: this.props.cart.subtotal}

        // axios.post('/api/new-order', body).then( response => {
        //     this.setState({orderNumber: response.data})
        //     axios.delete('/api/cart').then(() => {
        //         this.setState({orderComplete: true})
        //     })
        // }).catch(error => console.log('Error adding order to database:', error))
    }

    errorPayment = data => {
      console.log('Payment Error', data)
      const body = {cart: this.props.cart.cart, subtotal: this.props.cart.subtotal}

      axios.post('/api/new-order', body).then( response => {
        this.setState({orderNumber: response.data})
        axios.delete('/api/cart').then(() => {
            this.setState({orderComplete: true})
        })
    }).catch(error => console.log('Error adding order to database:', error))
    }

    onToken = (amount, acct) => (token, addresses) => {
        console.log(amount)
      axios.post('/api/save-stripe-token', {
            acct,
            source: token.id,
            currency: "USD",
            amount: amount,
            addresses,
            email: token.email,
            application_fee: amount * .03
        })
        .then(this.successPayment)
        .catch(this.errorPayment)
    }

    render() {
        if(this.state.orderComplete){
            return <Redirect to={`/OrderConfirmation/${this.state.orderNumber}`} />
        }

        const {name, amount, stripeKey, 
            // shippingAddress, billingAddress, 
            label, acct} = this.props
        return (
            <div>
                <StripeCheckout
                    acct={acct}
                    name={name}
                    // shippingAddress={shippingAddress}
                    // billingAddress={billingAddress}
                    amount={amount}
                    token={this.onToken(amount, acct)}
                    currency="USD"
                    stripeKey={stripeKey}
                    label={label}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(TakeMoney)