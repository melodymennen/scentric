import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../ducks/reducer'
import Header from './Header'
import Footer from './Footer'

import ProductModule from './ProductModule'

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
        console.log(navigator.userAgent)
        return (
            <div>
                <Header />
                <div className="home_hero">Lorem ipsum dolor sit amet, consectetur adipisicing elit</div>
                <div className="home_flex">
                {this.props.products.slice(0,6).map(e => {
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
