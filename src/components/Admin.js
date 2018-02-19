import React, { Component } from 'react'
import Inventory from './Inventory'
import Customers from './Customers'
import Orders from './Orders'


class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            route: ''
        }
        this.showInventory = this.showInventory.bind(this)
        this.showCustomers = this.showCustomers.bind(this)
        this.showOrders = this.showOrders.bind(this)
    }

    showInventory(){
        this.setState ({
            route: 'inventory'
        })
    }

    showCustomers(){
        this.setState ({
            route: 'customers'
        })
    }

    showOrders(){
        this.setState ({
            route: 'orders'
        })
    }
    

    render() {
        return (
            <div>
                <div className="admin_header_wrapper">
                    <img src="https://s3-us-west-1.amazonaws.com/scentric/favicon.ico" alt="logo" width="28px"/>
                    <span className="admin_header_logo">SCENTRIC</span>
                    <span>Admin Panel</span>
                </div>
                <div className="admin_flex">
                    <div className="admin_menu">
                        <div onClick={this.showInventory}>Inventory</div>
                        <div onClick={this.showCustomers}>Customers</div>
                        <div onClick={this.showOrders}>Orders</div>
                    </div>
                    <div>
                        {this.state.route === 'inventory' ? <Inventory/> : null}
                        {this.state.route === 'customers' ? <Customers/> : null}
                        {this.state.route === 'orders' ? <Orders/> : null}
                    </div>
                </div>
            </div>
        )
    }
}


export default Admin
