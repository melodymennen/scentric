import React, { Component } from 'react';
import axios from 'axios';

class ProductPage extends Component {
    constructor(){
        super()

        this.state = {
            product: {}
        }
    }

    componentDidMount(){
        axios.get(`/api/products/${this.props.match.params.product_id}`).then(response => {
            this.setState({product: response.data[0]})
         })
    }

    render() {
        return (
            <div>
                <img src={this.state.product.image_url} alt={this.state.product.name}/>
                <div>
                    {this.state.product.name}
                    ${this.state.product.price}
                    {this.state.product.description}
                </div>
            </div>
        )
    }
}

export default ProductPage;