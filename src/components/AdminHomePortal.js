import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import Dashboard from './Dashboard'



class AdminHomePortal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ordersSubtotal: 0,
            ordersTotal: 0
        }
    }

    componentDidMount() {
        this.getAllOrders()
        this.getAllUsers()
    }

    getAllOrders(){
        axios.get('/api/ordersall').then( response => {
            var ordersArray = []
            for( let i=0; i < response.data.length; i++){
                ordersArray.push(+(response.data[i].order_subtotal))
                }
            this.setState({
                ordersSubtotal: _.sum(ordersArray),
                ordersTotals: response.data.length
            })
        })
    }

    getAllUsers(){
        axios.get('/api/allusers').then( response => {
            this.setState({
                customerTotal: response.data.length
            })
        })
    }

    render() {
        console.log(this.state.ordersSubtotal)
        console.log(this.state.ordersTotals)
        return (
            <div>
                <div className="admin_wrapper_portal_overview">
                    <div className="admin_overview">Website Overview</div>
                    <div className="admin_home_first_body">
                        <div>
                            <div>Total Sales</div>
                            <div>$ {this.state.ordersSubtotal.toFixed(2)}</div>
                        </div>
                        <div>
                            <div>Total Orders</div>
                            <div>{this.state.ordersTotals}</div>
                        </div>
                        <div>
                            <div>Total Customers</div>
                            <div>{this.state.customerTotal}</div>
                        </div>
                        <div>
                            <div>Avg Sale per Order</div>
                            <div>$ {(this.state.ordersSubtotal/this.state.ordersTotals).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
                <Dashboard/>
            </div>
        )
    }
}



export default AdminHomePortal
