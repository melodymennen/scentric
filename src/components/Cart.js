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
                {this.props.cart.map((e,i)=> {
                    return (
                        <div key={i}>
                            <div>
                                <div><Link to={`/products/${e.id}`}><img src={e.image_url} alt={e.name}/></Link></div>
                                <div>{e.name}</div>
                                <div>Product Price: ${e.price}</div>
                            </div>
                            <div>
                                <div>qty: {e.qty}</div>
                                <div>Product Subtotal:  ${(e.price * e.qty).toFixed(2)}</div>
                            </div>
                        </div>
                    )
                })}
                <div>SubTotal: ${this.state.subtotal.toFixed(2)}</div>
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
