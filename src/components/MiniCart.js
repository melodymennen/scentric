import React, { Component } from 'react'

import { connect } from 'react-redux'
import { getCart } from '../ducks/reducer'
import _ from 'lodash'


class MiniCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subtotals: 0,
            subQty: 0
        }

        this.getCart = this.getCart.bind(this)
        this.subtotal = this.subtotal.bind(this)
    }

    componentDidMount(){
        this.getCart()
    }

    getCart(){
        this.props.getCart().then(() => {
            this.subtotal()
        })
    }

    subtotal (){
        var prices = []
        var qty = []
        for( let i=0 ; i < this.props.cart.length ; i++) {
            prices.push(+(this.props.cart[i].price*this.props.cart[i].qty))
        }
        for( let i=0; i < this.props.cart.length; i++){
            qty.push(+(this.props.cart[i].qty))
        }
        this.setState({subtotals: _.sum(prices)})
        this.setState({subQty: _.sum(qty)})

    }

    


    render() {
        const cart = this.props.cart.map((e) => {
            console.log(this.props.cart)
            return (
                <div className="minicart_flex" key={e.id}>
                        <div><img src={e.image_url} alt="product" width="60px"/></div>
                    <div className="minicart_wrapper">
                        <div style={name}>{e.name}</div>
                        <div>Qty: {e.qty}</div>
                    </div>
                        <div className="minicart_producttotal">${(e.price * e.qty).toFixed(2)}</div>
            </div>)
        })
        return (
            <div >
                <div className="minicart_summary">Cart Summary</div>
                    {cart}
                    <div className="minicart_ordertotals">Subtotal ({this.state.subQty} Items): ${this.state.subtotals.toFixed(2)}
                    <div>Shipping(Flat Rate): $5.00</div>
                    <div>Tax: ${(this.state.subtotals * .06).toFixed(2)}</div>
                    <div className="minicart_ordersubtotals"> Order Subtotal: ${((this.state.subtotals * .06) + this.state.subtotals + 5).toFixed(2)} </div>
                </div>
            </div>
        )
    }
}

const name = {
    fontSize: '12pt',
    fontWeight: 'bold',
    textTransform: 'capitalize'
}

function mapStateToProps(state){
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = {
    getCart: getCart
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart)
