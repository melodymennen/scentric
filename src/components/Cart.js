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
            unique: [],
            totals: {}, 
            subtotal: 0
        }

        this.countDupes = this.countDupes.bind(this)
        this.subtotal = this.subtotal.bind(this)
    }

    componentDidMount() {
        this.props.getCart().then(() => {
            this.countDupes()
            this.subtotal()
        })
    }

    countDupes () {
        var unique = _.uniqBy(this.props.cart, 'product_id')
        var totals = {}
        console.log(unique)
        for (let i=0; i < unique.length; i++){
            var count = 0
            this.props.cart.find(e => {
                e.product_id === unique[i].product_id ? count++ : null
            })
            totals[unique[i].product_id.toString()] = count
        }
        this.setState({unique: unique, totals: totals})
    }

    subtotal (){
        var prices = []
        for( let i=0 ; i < this.props.cart.length ; i++) {
            prices.push(+this.props.cart[i].price)
        }
        // var subtotal = _.sum(prices)
        this.setState({subtotal: _.sum(prices)})
    }


    render() {
        console.log(this.state.totals)
        return (
            <div>
                <Header />
                {(this.state.unique).map((e,i)=> {
                    return (
                        <div key={i}>
                            <div>
                                <div><Link to={`/products/${e.id}`}><img src={e.image_url}/></Link></div>
                                <div>{e.name}</div>
                                <div>Product Price: ${e.price}</div>
                            </div>
                            <div>
                                <div>qty: {this.state.totals[e.id]}</div>
                                <div>Product Subtotal:  ${(e.price * this.state.totals[e.id]).toFixed(2)}</div>
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
