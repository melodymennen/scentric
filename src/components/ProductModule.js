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
                    <div className="productmodule_card">
                        <Link to={`/products/${this.props.id}`}>
                            <div className="productmodule_card-image">
                                <img src={this.props.pic} alt="product" />
                            </div>
                            <div className="productmodules_card-body">
                                <div className="productmodule_card-title">
                                    <h3>{this.props.name}</h3>
                                </div>
                                <div className="productmodule_card-excerpt">
                                    <p>$ {this.props.price}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProductModule
