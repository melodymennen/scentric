import React, { Component } from 'react'
import ProductModule from './ProductModule'
import Header from './Header'
import axios from 'axios'

class DisplayProducts extends Component {
    constructor(){
        super()

        this.state = {
            products: []
        }
    }

    componentDidMount(){
        axios.get(`/api/display/${this.props.match.params.category}`).then(response => {
            this.setState({ products: response.data })
        })
    }

    render() {
        var products = this.state.products.map(item => {
            return (
                 <ProductModule
                 name={item.name} 
                 description={item.description}
                 price={item.price}
                 pic={item.image_url}
                 id={item.id}
                 />
            )}
        )

        return (
            <div>
                <Header />
                {products}
            </div>
        )
    }
}

export default DisplayProducts