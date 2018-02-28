import React, { Component } from 'react'
import axios from 'axios'



class Customers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: []
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers(){
        axios.get('/api/allusers').then( response => {
            this.setState({
                customers: response.data
            })
         })
    }

    // getCustomersOrders(){
    //     axios.get('/api/customers/admin').then( response => {
    //         for( let i=0; i < response.data.length; i++){
    //             if(response.data[i])
    //         }
    //     })
    // }
    
    render() {
            const cust = this.state.customers.map( e => {
                return (
                    <div key={e.id} className="admin_customers_flex">
                        <div>{e.name}</div>
                        <div className="email">{e.email}</div>
                        <div>Location</div>
                    </div>
                )
            })
        return (
            <div>
                <div className="viewinventory_wrapper_body">
                    <div className="viewinventory_flex_wrapper_title">
                        <div className="customers_name">Name</div>
                        <div className="customers_email">Email</div>
                        <div className="customers_location">Location</div>
                    </div>
                    <div className="customer_product_table">{cust}</div>
                </div>
            </div>
        )
    }
}


export default Customers
