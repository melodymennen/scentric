import React, { Component } from 'react'
import axios from 'axios'


class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: []
        }
    }

    componentDidMount() {
        this.getProduct()
    }
    getProduct(){
        axios.get(`/api/products/${this.props.match.params.id}`).then(response => {
            console.log(response.data)
            this.setState({product: response.data[0]})
         })
    }
    render() {
        const e = this.state.product
        return (
            <div>
                
            </div>
        )
    }
}



export default EditProduct
