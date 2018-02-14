import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {getCart} from '../ducks/reducer'
import Header from './Header'
import _ from 'lodash'


class Cart extends Component {
    constructor (){
        super()

        this.state = {
            subtotal: 0
        }

        this.subtotal = this.subtotal.bind(this)
    }

    componentDidMount() {
        this.props.getCart().then(() => {
            this.subtotal()
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
                    {this.props.cart.map((e,i)=> {
                        return (
                            <div key={i} className="cart-line-item-wrapper" >
                                <div className="cart-line-item">
                                    <div className="cart-left" >
                                        <div><Link to={`/products/${e.id}`}><img src={e.image_url} alt={e.name}/></Link></div>
                                        <div><Link to={`/products/${e.id}`}>{e.name}</Link></div>
                                        {/* <div>${e.price}</div> */}
                                    </div>
                                    <div className="cart-right" >
                                        <div>{e.qty}</div>
                                        <div>${(e.price * e.qty).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="cart-totals" >Order Subtotal: ${this.state.subtotal.toFixed(2)}</div>
                </div>
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
