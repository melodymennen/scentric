import React, { Component } from 'react'

import { connect } from 'react-redux'
import { getCart } from '../ducks/reducer'


class MiniCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

        this.getCart = this.getCart.bind(this)
    }

    componentDidMount(){
        this.getCart()
    }

    getCart(){
        this.props.getCart()
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
                        <div>Total Price: ${e.price * e.qty}</div>
                    </div>
            </div>)
        })
        return (
            <div>
                <div className="minicart_summary">Cart Summary</div>
                {cart}
            </div>
        )
    }
}

const name = {
    fontSize: '12pt',
    fontWeight: 'bold'
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
