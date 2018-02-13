import React, { Component } from 'react';
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
            console.log(response.data)
            console.log(this.state.products)
        })
    }

    render() {
        var products = this.state.products.map(item => {
            return (
                <div key={item.id}>
                    <img src={item.image_url} alt={item.name} />
                </div>
            )}
        )

        return (
            <div>
                {products}
            </div>
        )
    }
}

export default DisplayProducts;