import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../ducks/reducer'


class ViewInventory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            price: 0,
            description: '',
            category: '',
            scent_family: '',
            img_url: ''
        }
    }

    componentDidMount() {
        this.props.getProducts()
    }


    render() {
            const p = this.props.products.map(e => {
                return(
                <div key={e.id}
                className="viewinventory_flex_wrapper">
                    <div><img src={e.image_url} alt="product" width="60px"/></div>
                    <div className="name">{e.name}</div>
                    <div className="price">${e.price}</div>
                    <div className="description">{e.description}</div>
                    <div className="category">{e.category}</div>
                    <div className="scent_family">{e.scent_family}</div>
                </div>)
            })
        return (
            <div>
                <div className="viewinventory_flex_wrapper_title">
                    <div className="title_image">Image</div>
                    <div className="title_name">Product Name</div>
                    <div className="title_price">Price</div>
                    <div className="title_description">Description</div>
                    <div className="title_category">Category</div>
                    <div className="title_scentfamily">Scent Family</div>
                </div>
                <div className="admin_product_table">{p}</div>
            </div>
        )
    }
}



function mapStateToProps(state) {
    return {
        products: state.products
    }
}

const mapDispatchToProps = {
    getProducts: getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewInventory)