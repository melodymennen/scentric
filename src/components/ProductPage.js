import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'

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
        this.generateId()         
    }

    addToCart(){
        const body = {
            product_id: this.state.product.id
        }

        axios.post('/api/cart', body).then(response => {
            console.log('item added to cart')
        })
    }

    generateId(){
        var generatedId = Math.floor((Math.random() * 100000000) + 1)
        console.log(generatedId)
        // localStorage.removeItem("generatedId")
        if(localStorage.getItem("generatedId")){
            axios.post('/api/generatedId', {generatedId: localStorage.getItem("generatedId")})
            console.log(localStorage.getItem("generatedId"))
        } else {
            localStorage.setItem('generatedId', generatedId)
            axios.post('/api/generatedId', {generateId: localStorage.getItem("generatedId")})
            console.log(localStorage.getItem("generatedId"))  
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="product-page-body">
                    <img src={this.state.product.image_url} alt={this.state.product.name} />
                    <div className="product-page-info">
                        <div className="product-page-name">{this.state.product.name}</div>
                        <div className="product-page-price">${this.state.product.price}</div>
                        <div className="product-page-description">{this.state.product.description}</div>
                        <button onClick={() => this.addToCart()} >Add To Cart</button>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default ProductPage;