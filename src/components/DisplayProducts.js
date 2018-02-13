import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

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
                <div key={item.id}>
                    <Link to={`/products/${item.id}`}><img src={item.image_url} alt={item.name} /> </Link>
                </div>
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

export default DisplayProducts;