import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {getCart} from '../ducks/reducer'
import Header from './Header'


class Cart extends Component {

    componentDidMount() {
        this.props.getCart()
    }


    render() {
        return (
            <div>
                <Header />
                {this.props.cart.map((e,i)=> {
                    return (
                        <div key={i}>
                            <div><Link to={`/products/${e.id}`}><img src={e.image_url}/></Link></div>
                            <div>{e.name}</div>
                            <div>{e.price}</div>
                            <div>qty</div>
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
