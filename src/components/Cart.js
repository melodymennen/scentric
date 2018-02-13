import React, { Component } from 'react';

import { connect } from 'react-redux'
import {getCart} from '../ducks/reducer'


class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.props.getCart()
    }


    render() {
        return (
            <div>
                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit</h1>
                {this.props.cart.map((e,i)=> {
                    return (
                        <div key={i}>
                        <div>{e.name}</div>
                        <div>{e.price}</div>
                        </div>
                    )
                })}
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
