import React, { Component } from 'react'
import axios from 'axios'
import Admin from './Admin'


class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: []
        }
    }

    componentWillReceiveProps(props){
        console.log(this.props.id)
        this.getProduct(props.id)
    }

    getProduct(id){
        axios.get(`/api/admin/${id}`).then(response => {
            console.log(response.data)
            this.setState({product: response.data[0]})
         })
    }
    render() {
        const e = this.state.product
        return (
            <div>
                <div>{e.name}</div>
                <div>{e.description}</div>
                <div><img src={e.image_url} alt="product" width="300px"/></div>
                <div>{e.price}</div>
                <div>{e.sale ? <div>On Sale</div> : <div>Not on Sale</div>}</div>
                <div>{e.category}</div>
                <div>{e.scent_family}</div>
            </div>
        )
    }
}



export default EditProduct
