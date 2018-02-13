import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getProducts } from '../ducks/reducer'

import ProductList from './ProductList'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    
    componentDidMount() {
        this.props.getProducts()
    }

    render() {
        return (
            <div>
                <div style={tempNav}>nav</div>
                <div className="home_hero">Lorem ipsum dolor sit amet, consectetur adipisicing elit</div>
                <div className="home_flex">
                {this.props.products.slice(0,6).map(e => {
                    return (
                    <div key={e.id}>
                        <ProductList 
                        name={e.name} 
                        description={e.description}
                        price={e.price}
                        pic={e.image_url}
                        />
                    </div>
                    )
                })}
                </div>
            </div>
        )
    }
}

const tempNav = { 
    backgroundColor: 'gray',
    height: '50px'
}


function mapStateToProps(state) {
    return {
        products: state.products
    }
}

const mapDispatchToProps = {
    getProducts: getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)