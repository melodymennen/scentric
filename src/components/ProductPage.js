import React, { Component } from 'react';
import Header from './Header'
import axios from 'axios';

class ProductPage extends Component {
    constructor(){
        super()

        this.state = {
            product: {}
        }

        this.addToCart = this.addToCart.bind(this)
    }

    componentDidMount(){
        axios.get(`/api/products/${this.props.match.params.product_id}`).then(response => {
            this.setState({product: response.data[0]})
         })
    }

    addToCart(){
        const body = {
            product_id: this.state.product.id
        }

        axios.post('/api/cart', body).then(response => {
            console.log('item added to cart')
        })
    }

    render() {
        return (
            <div>
                <Header />
                <img src={this.state.product.image_url} alt={this.state.product.name} />
                <div>
                    {this.state.product.name}
                    ${this.state.product.price}
                    {this.state.product.description}
                </div>
                <button onClick={() => this.addToCart()} >Add To Cart</button>
            </div>
        )
    }
}

export default ProductPage;