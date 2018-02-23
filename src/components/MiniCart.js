import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCart } from '../ducks/reducer'
import { Link } from 'react-router-dom'
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
            return (
                <div className="minicart_flex" key={e.id}>
                        <div><img src={e.image_url} alt="product" width="70px"/></div>
                    <div className="minicart_wrapper">
                        <div style={name}><Link to={`/products/${e.id}`}>{e.name}</Link></div>
                        <div>Qty: {e.qty}</div>
                    </div>
                        <div className="minicart_producttotal">${(e.price * e.qty).toFixed(2)}</div>
            </div>)
        })
        return (
            <div >
                <div className="minicart_summary">Cart Summary</div>
                    {cart}
                    <div className="minicart_ordertotals">
                        <div>
                            <span>Subtotal ({this.props.cart.qty} Items):</span>
                            <div> ${this.props.cart.subtotal.toFixed(2)}</div>
                        </div>
                        <div>
                            <span>Shipping(Flat Rate):</span>
                            <div>$5.00</div>
                        </div>
                        <div>
                            <span>Tax:</span>
                            <div>${(this.props.cart.subtotal * .06).toFixed(2)}</div>
                        </div>
                        <div className="minicart_ordersubtotals"> 
                            <span>Order Total:</span>
                            <div>${((this.props.cart.subtotal * 1.06) + 5).toFixed(2)} </div>
                        </div>
                    </div>
                </div>
        )
    }
}

const name = {
    fontSize: '10pt',
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
