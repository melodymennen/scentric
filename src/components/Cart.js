import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {getCart} from '../ducks/reducer'
import axios from 'axios'
import Header from './Header'
import Footer from './Footer'
import _ from 'lodash'


class Cart extends Component {
    constructor (){
        super()

        this.state = {
            subtotal: 0
        }

        this.subtotal = this.subtotal.bind(this)
        this.increaseQty = this.increaseQty.bind(this)
        this.decreaseQty = this.decreaseQty.bind(this)
        this.getCart = this.getCart.bind(this)
        this.removeFromCart = this.removeFromCart.bind(this)
    }

    componentDidMount() {
        this.getCart()
    }

    getCart(){
        this.props.getCart().then(() => {
            this.subtotal()
        })
    }

    increaseQty(product_id){
        const body = {
            product_id: product_id
        }

        axios.post('/api/cart', body).then(response => {
            console.log('item added to cart')
            this.getCart()
        })
    }

    decreaseQty(qty, product_id){
        const body = {
            product_id: product_id
        }

        if(qty === 1) {
            this.removeFromCart(product_id)
        } else {
            axios.patch('/api/cart', body).then(() => {
                console.log('item removed from cart')
                this.getCart()
            })
        }
    }

    removeFromCart(product_id){
        axios.delete(`/api/cart/${product_id}`).then(response => {
            console.log('item removed from cart')
            this.getCart()
        })
    }

    subtotal (){
        var prices = []
        for( let i=0 ; i < this.props.cart.length ; i++) {
            prices.push(+(this.props.cart[i].price*this.props.cart[i].qty))
        }
        this.setState({subtotal: _.sum(prices)})
    }


    render() {
        const cart = this.props.cart.map((e)=> {
            return (
                <div key={e.id} className="cart-line-item-wrapper" >
                    <div className="cart-line-item">
                        <div className="cart-left" >
                            <div><Link to={`/products/${e.id}`}><img src={e.image_url} alt={e.name}/></Link></div>
                            <div className="cart-product-name"><Link to={`/products/${e.id}`}>{e.name}</Link></div>
                            <button onClick={() => this.removeFromCart(e.id)}>remove</button>
                            {/* <div>${e.price}</div> */}
                        </div>
                        <div className="cart-right" >
                            <div className="cart-qty">
                                <button onClick={() => this.decreaseQty(e.qty, e.id)} >-</button>
                                {e.qty}
                                <button onClick={() => this.increaseQty(e.id)}>+</button>
                            </div>
                            <div>${(e.price * e.qty).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <Header />
                <div className="cart-body">
                    <div className="cart-column-names">
                        <div className="cart-left"></div>
                        <div className="cart-right">
                            <div>Quantity</div>
                            <div>Total</div>
                        </div>
                    </div>
                    {this.props.cart.length === 0 && 
                        <div className="cart-no-items">There are no items in your cart.</div>
                    }
                    {this.props.cart && cart}
                    <div className="cart-totals">Order Subtotal: ${this.state.subtotal.toFixed(2)}</div>
                    <Link to="/checkout"><div className="cart_checkout_button"><button>Check Out</button></div></Link>
                </div>
                <Footer />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = {
    getCart: getCart
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
