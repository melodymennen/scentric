import React, { Component } from 'react';
import axios from 'axios'

export default class AccountHistory extends Component {
    constructor() {
        super()
        this.state = {
            orders: []
        }
    }
    componentDidMount() {
        axios.get('/api/orders').then((res) => {
            this.setState({ orders: res.data })
            console.log("orders state", this.state.orders)
            console.log("res.data", res.data)
        }) 
    }


    render() {
        // const orders = this.state.orders.map(item => {
        //     return (
        //         <div key={item.id}>
        //             <div>{item.order_subtotal}</div>
        //             <div>{item.order_date}</div>
        //         </div>
        //     )
        // })
            return (

                <div className='account_container account_show-favorites'>
                    <div className="account_history-excerpt">
                        {/* { orders } */}
                    </div>
                </div>

            );
        }
    }