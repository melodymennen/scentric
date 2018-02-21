import React, { Component } from 'react'
import axios from 'axios'
import Admin from './Admin'


class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: [],
        }
    }

    // componentWillReceiveProps(props){
    //     this.getProduct(props.id)
    // }

    componentDidMount(props) {
        this.getProduct(this.props.id)
    }


    getProduct(id){
        axios.get(`/api/admin/${id}`).then(response => {
            this.setState({product: response.data[0]})
            console.log('resosone',response.data)
         })
    }

    

    render() {
        const e = this.state.product
        console.log('df', e)
        return (
            <div className="edit_products_modal_backdrop">
                <div className="edit_products_modal">
                    <div>{e.name}</div>
                    <div>Name</div>
                    <div><input value={e.name}/></div>
                    <div>Description</div>
                    <div><textarea value={e.description}/></div>
                    <div><img className="editproduct_image_modal" src={e.image_url} alt="product" width="200px"/></div>
                    <div>{e.price}</div>
                    <div>{e.sale ? <span>On Sale</span> : <span>Not on Sale</span>}</div>
                    <div>{e.category}</div>
                    <div>{e.scent_family}</div>
                    <button onClick={this.props.closed}>Close</button>
                    <button>Edit</button>
                </div>
            </div>
        )
    }
}



export default EditProduct
