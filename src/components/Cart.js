import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCart } from '../ducks/reducer'
import functions from '../utilities/functions'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'


class Cart extends Component {
    constructor(props) {
        super(props)

        this.state ={}

    }

    componentWillMount(){
        functions.generateId()        
    }

    componentDidMount() {
        this.getCart()
    }

    getCart(){
        this.props.getCart()
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
            axios.patch('/api/cart', body).then((response) => {
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

    render() {
        const cart = this.props.cart.cart.map((e)=> {
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
                    <div className="cart-totals">
                        Order Subtotal: ${this.props.cart.subtotal.toFixed(2)}
                        <Link to="/checkout"><div><button className="button" >Check Out</button></div></Link>
                    </div>
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
