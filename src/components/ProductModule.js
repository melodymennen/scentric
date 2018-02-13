import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class ProductModule extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <div className="home_all_products">
                    <div><Link to={`/products/${this.props.id}`}><img src={this.props.pic} alt="product" width="300px"/></Link></div>
                    <div>{this.props.name}</div>
                    <div>{this.props.price}</div>
                </div>
            </div>
        )
    }
}


export default ProductModule
