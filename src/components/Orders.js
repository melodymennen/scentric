import React, { Component } from 'react'
import axios from 'axios'


class Orders extends Component {
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
            const ordersArr = this.state.orders.reverse().map((e,i) => {
                return (
                    <div className="admin_orders_flex"key={i}>
                        <div>{e.name}</div>
                        <div>$ {e.order_subtotal}</div>
                        <div>{e.order_date}</div>
                    </div>
                )
            })
        return (
            <div>
            <div className="viewinventory_wrapper_body">
                <div className="viewinventory_flex_wrapper_title">
                    <div className="customers_name">Customer Name</div>
                    <div className="customers_email">Cost of Sale</div>
                    <div className="customers_location">Date</div>
                </div>
                <div className="customer_product_table">{ordersArr}</div>
            </div>
            </div>
        )
    }
}

export default Orders
