import React, { Component } from 'react'
import ProductModule from './ProductModule'
import functions from '../utilities/functions'
import Header from './Header'
import Footer from './Footer'
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
        functions.generateId()
    }

    componentWillReceiveProps(props){
        axios.get(`/api/display/${props.match.params.category}`).then(response => {
            this.setState({ products: response.data })
        })
    }


    render() {
        var products = this.state.products.map(item => {
            return (
                 <ProductModule key={item.id}
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
                <div className="displayproducts_box-area">
                {products}
                </div>
                <Footer />
            </div>
        )
    }
}

export default DisplayProducts