import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import functions from '../utilities/functions'
import axios from 'axios'

class OrderConfirmation extends Component {
    constructor(){
        super()

        this.state = {
            order:[]
        }

        this.getOrder = this.getOrder.bind(this)
    }

    componentDidMount(){
        this.getOrder()
        functions.generateId()
    }

    getOrder(){
        axios.get(`/api/orders/${this.props.match.params.order_id}`).then(response => {
            this.setState({order: response.data})
            console.log(this.state.order)
         })
    }

    render() {
        const d = new Date()
        const date = `${d.getMonth()} ${d.getDate()}`
        const orderItems = this.state.order.map(item => {
            return (
                <div key={item.id} className="orderconfirmation_line-item">
                    <div><img src={item.image_url} alt={item.name} /></div>
                    <div>
                        {item.name}
                    </div>
                    <div>
                        ${item.price}<br/>
                    </div>
                    <div>
                        {item.qty}<br/>
                    </div>
                    <div>
                        ${item.price * item.qty}
                    </div>
                </div>
            )
        })
        return (
            <div className="orderconfirmation_body">
                <div>Thank you for your order!</div>
                <div>Your order number is {`${date}${this.props.match.params.order_id}`}.</div>
                {orderItems}
            </div>
        )
    }
}

export default OrderConfirmation