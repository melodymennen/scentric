import React, { Component } from 'react'


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
                    <div><img src={this.props.pic} alt="product" width="300px"/></div>
                    <div>{this.props.name}</div>
                    <div>{this.props.price}</div>
                </div>
            </div>
        )
    }
}


export default ProductModule
