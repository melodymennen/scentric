import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import functions from '../utilities/functions'
import Header from './Header'
import Footer from './Footer'
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
                    <div><Link to={`/products/${item.id}`}><img src={item.image_url} alt={item.name} /> </Link></div>
                    <div className="orderconfirmation_line-item-name" >
                        <Link to={`/products/${item.id}`}> {item.name} </Link>
                    </div>
                    <div className="orderconfirmation_line-item-price">
                        ${item.price}
                    </div>
                    <div className="orderconfirmation_line-item-qty">
                        {item.qty}
                    </div>
                    <div className="orderconfirmation_line-item-subtotal">
                        ${item.price * item.qty}
                    </div>
                </div>
            )
        })
        return (
            <div>
                <Header />
                <div className="orderconfirmation_body">
                    <div className="orderconfirmation_thank-you" >Thank you for your order!</div>
                    <div className="orderconfirmation_order-number">Your order number is <span>{`${date}${this.props.match.params.order_id}`}</span>.</div>
                    <div className="orderconfirmation_summary" >Order Summary</div>
                    <div className="orderconfirmation_line-item">
                        <div className="orderconfirmation_line-item-image">
                        </div>
                        <div className="orderconfirmation_line-item-name">
                            
                        </div>
                        <div className="orderconfirmation_line-item-price">
                            Price
                        </div>
                        <div className="orderconfirmation_line-item-qty">
                            Quantity
                        </div>
                        <div className="orderconfirmation_line-item-subtotal">
                            Total
                        </div>
                    </div>
                    {orderItems}
                </div>
                <Footer />
            </div>
        )
    }
}

export default OrderConfirmation