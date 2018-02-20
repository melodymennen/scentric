import React, { Component } from 'react'
import axios from 'axios'


class Customers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
       this.getOrders()
    }

    getOrders(){
        axios.get('/api/customers/admin').then((response) => {
            
            this.setState({
                orders: response.data
            })
        })
    }

    render() {
            const ordersArr = this.state.orders.map((e,i) => {
                return (
                    <div className="admin_orders_flex"key={i}>
                        <div>{e.name}</div>
                        <div>{e.order_subtotal}</div>
                        <div>{e.order_date}</div>
                    </div>
                )
            })
        return (
            <div>
                <div>{ordersArr}</div>
            </div>
        )
    }
}

export default Customers
