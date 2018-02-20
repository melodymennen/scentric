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
            console.log(response.data)
            this.setState({
                customers: response.data
            })
        })
    }
    
    render() {
        const customersMap = this.state.customers.map(e => {
            return (
                <div key={e.id}>
                    <div>{e.name}</div>
                    <div>{e.email}</div>
                </div>
            )
        })
        return (
            <div>
                <div>{customersMap}</div>
            </div>
        )
    }
}


export default Customers
