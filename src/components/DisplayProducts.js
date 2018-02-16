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
        if(this.props.match.params.category === 'perfume' || this.props.match.params.category === 'cologne'){
            axios.get(`/api/display/${this.props.match.params.category}`).then(response => {
                this.setState({ products: response.data })
            })
        } else {
            axios.get(`/api/scentfam/${this.props.match.params.category}`).then(response => {
                this.setState({ products: response.data })
            })
        }
        functions.generateId()
    }

    componentWillReceiveProps(props){
        if(props.match.params.category === 'perfume' || props.match.params.category === 'cologne'){
            axios.get(`/api/display/${props.match.params.category}`).then(response => {
                this.setState({ products: response.data })
            })
        } else {
            axios.get(`/api/scentfam/${props.match.params.category}`).then(response => {
                this.setState({ products: response.data })
            })
        }
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
                {this.state.products && 
                    <div className="displayproducts_box-area">
                        {products}
                    </div>
                }
                {this.state.products.length === 0 &&
                    <div className="displayproducts_box-area">
                        <div className="cart-no-items">
                            There are no products to display. 
                        </div>
                    </div>
                }
                <Footer />
            </div>
        )
    }
}

export default DisplayProducts