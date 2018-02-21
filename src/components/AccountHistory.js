import React, { Component } from 'react';
import axios from 'axios'

class AccountHistory extends Component {
    constructor() {
        super()
        this.state = {
            orders: [],
            order: false
        }
    }
    componentDidMount() {
        axios.get('/api/orders').then((res) => {
            this.setState({ orders: res.data })         
            console.log("orders state", this.state.orders)
        })
    }

    orders = () => {
        return (this.state.orders.map((element, index) => {
            return (
                <div key={index}>
                    <div className="account_history_chart">
                        <div>{element.user_id}</div>
                        <div>{element.order_date}</div>
                        <div>{element.id}</div>
                        <div>Complete</div>
                        <div>{element.order_subtotal}</div>
                    </div>
                </div>
            )
        }
        ))
    }

    render() {
        return (
            <div className='account_container account_show-favorites'>
                {this.state.orders &&
                <div className="account_history-excerpt">
                    <div className="account_history_chart-title">
                        <span>Order #</span> <span>Order Date</span> <span>Purchase Id</span> <span>Status</span> <span>Total Price</span>
                    </div>
                    {this.orders()}
                </div>}
                {this.state.orders.length === 0 && 
                    <div>There are no orders to display.</div>}
            </div>

        );
    }
}

export default AccountHistory