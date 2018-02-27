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
                        <div>Orders</div>
                        <div>Amount Spent</div>
                    </div>
                )
            })
        return (
            <div>
                <div>
                    <div>
                        <div>Name</div>
                        <div>Email</div>
                        <div>Location</div>
                    </div>
                    <div>{cust}</div>
                </div>
            </div>
        )
    }
}


export default Customers
