import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
// import { connect } from 'react-redux'
import axios from 'axios'

class TakeMoney extends Component {

    onToken = (amount, acct) => (token, addresses) => {
        console.log(amount);
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
        .catch(this.errorPayment);
    }

    render() {
        const {name, amount, stripeKey, shippingAddress, billingAddress, label, acct} = this.props;
        return (
            <div>
                <StripeCheckout
                    acct={acct}
                    name={name}
                    shippingAddress={shippingAddress}
                    billingAddress={billingAddress}
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

export default TakeMoney