import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCart } from '../ducks/reducer'
import functions from '../utilities/functions'


class MiniCart extends Component {

    componentDidMount(){
        this.getCart()
        functions.generateId()
    }

    getCart(){
        this.props.getCart()
    }


    render() {
        const cart = this.props.cart.cart.map((e) => {
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
                    <div className="minicart_ordertotals">Subtotal ({this.props.cart.qty} Items): ${this.props.cart.subtotal.toFixed(2)}
                    <div>Shipping(Flat Rate): $5.00</div>
                    <div>Tax: ${(this.props.cart.subtotal * .06).toFixed(2)}</div>
                    <div className="minicart_ordersubtotals"> Order Subtotal: ${((this.props.cart.subtotal * .06) + this.props.cart.subtotal + 5).toFixed(2)} </div>
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
