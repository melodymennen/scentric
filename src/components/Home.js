import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProducts, getUser } from '../ducks/reducer'
import functions from '../utilities/functions'
import ProductModule from './ProductModule'
import Slider from 'react-slick'
import Header from './Header'
import Footer from './Footer'




class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }


    componentDidMount() {
        this.props.getProducts()
        this.props.getUser()
        functions.generateId()
    }

    render() {
        var settings = {
            dots: true,
            speed: 1000,
            autoplay: true,
            arrows: true,
            pauseOnHover: false,
            autoplaySpeed: 8000,

            
        };
        return (
            <div>
                <Header />
                <div className="home_hero">
                    <Slider {...settings}>
                        <div><img alt="mens cologne" className="home_pictures" src='https://s3-us-west-1.amazonaws.com/scentric/colognehero.png' /></div>
                        <div><img alt="wemens perfume" className="home_pictures" src='https://s3-us-west-1.amazonaws.com/scentric/womensperfume.png' /></div>
                    </Slider>
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
    getProducts: getProducts,
    getUser: getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
