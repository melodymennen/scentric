import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUser } from '../ducks/reducer'
import ViewInventory from './ViewInventory'
import AddInventory from './AddInventory'
import Customers from './Customers'
import Orders from './Orders'


class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            route: ''
        }

        this.showAddInventory = this.showAddInventory.bind(this)
        this.showViewInventory = this.showViewInventory.bind(this)
        this.showCustomers = this.showCustomers.bind(this)
        this.showOrders = this.showOrders.bind(this)
    }

    componentWillMount(){
        this.props.getUser()
    }

    showViewInventory(){
        this.setState ({
            route: 'viewinventory'
        })
    }

    showAddInventory(){
        this.setState ({
            route: 'addinventory'
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
        const { user } = this.props
        console.log(user)
        return (
            <div>
                {/* {user.is_admin === false && 
                    <div>
                        Uh oh, it looks like you don't have access to this page. Head back over to <Link to="/home">scentric.com</Link> to keep shopping!
                    </div>
                } */}
                {/* {user.is_admin && */}
                    <div>
                        <div className="admin_header_wrapper">
                            <Link to="/home"><img src="https://s3-us-west-1.amazonaws.com/scentric/favicon.ico" alt="logo" width="28px"/></Link>
                            <Link to="/home"><span className="admin_header_logo">SCENTRIC</span></Link>
                            <span>Admin Portal</span>
                        </div>
                        <div className="admin_flex">
                            <div className="admin_menu">
                                <div onClick={this.showViewInventory}>View Inventory</div>
                                <div onClick={this.showAddInventory}>Add Inventory</div>
                                <div onClick={this.showCustomers}>Customers</div>
                                <div onClick={this.showOrders}>Orders</div>
                            </div>
                            <div style={margin}>
                                {this.state.route === 'viewinventory' ? <ViewInventory/> : null}
                                {this.state.route === 'addinventory' ? <AddInventory/> : null}
                                {this.state.route === 'customers' ? <Customers/> : null}
                                {this.state.route === 'orders' ? <Orders/> : null}
                            </div>
                        </div>
                    </div>
                {/* } */}
            </div>
        )
    }
}

const margin = {
    margin: '70px auto'
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    getUser: getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
