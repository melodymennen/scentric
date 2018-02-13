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
            totals: {}
        }

        this.countDupes = this.countDupes.bind(this)
    }

    componentDidMount() {
        this.props.getCart().then(() => {
            this.countDupes()
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


    render() {
        console.log(this.state.totals)
        return (
            <div>
                <Header />
                {(this.state.unique).map((e,i)=> {
                    return (
                        <div key={i}>
                            <div><Link to={`/products/${e.id}`}><img src={e.image_url}/></Link></div>
                            <div>{e.name}</div>
                            <div>{e.price}</div>
                            <div>qty: {this.state.totals[e.id]}</div>
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
