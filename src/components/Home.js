import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../ducks/reducer'
import functions from '../utilities/functions'
import ProductModule from './ProductModule'
import Header from './Header'
import Footer from './Footer'



class Home extends Component {
    constructor(props) {
        super(props)
        
        this.state ={}
    }

    
    componentDidMount() {
        this.props.getProducts()
        functions.generateId()
    }

    render() {
        return (
            <div>
                <Header />
                <div className="home_hero">
                </div>
                <div className="home_featured_products">Featured Products</div>
                <div className="home_flex">
                {this.props.products.map(e => {
                    return (
                    <div key={e.id}>
                        <ProductModule
                        name={e.name} 
                        description={e.description}
                        price={e.price}
                        pic={e.image_url}
                        id={e.id}
                        />
                    </div>
                    )
                })}
                </div>
                <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
