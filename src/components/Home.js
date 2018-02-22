import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProducts, getUser } from '../ducks/reducer'
import { Link } from 'react-router-dom'
import functions from '../utilities/functions'
import ProductModule from './ProductModule'
import ChatBubble from './ChatBubble'
import Ornament from './Ornament'
import Slider from 'react-slick'
import Header from './Header'
import Footer from './Footer'




class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showChat: false
        }
    }


    componentDidMount() {
        this.props.getProducts()
        this.props.getUser()
        functions.generateId()
        window.scrollTo(0,0)
    }

    showChat(){
        this.setState({showChat: !this.state.showChat})
        console.log(this.state)
    }

    render() {
        var settings = {
            dots: true,
            speed: 1000,
            autoplay: true,
            arrows: true,
            pauseOnHover: false,
            autoplaySpeed: 8000,

            
        }
        return (
            <div>
                <Header />
                <div className="home_hero">
                    <Slider {...settings}>
                        <div><img alt="mens cologne" className="home_pictures" src='https://s3-us-west-1.amazonaws.com/scentric/colognehero.png'/></div>
                        <div><img alt="womens perfume" className="home_pictures" src='https://s3-us-west-1.amazonaws.com/scentric/womensperfume.png' /></div>
                    </Slider>
                </div>
                <div className="home_featured">
                    <Link to="/NewArrivals"><div><img src="https://s3-us-west-1.amazonaws.com/scentric/newarrivals.png" alt="new arrivals" width="550px"/></div></Link>
                    <Link to="/Sale"><div><img src="https://s3-us-west-1.amazonaws.com/scentric/sale.png" alt="sale" width="550px"/></div></Link>
                </div>
                <div className="home_featured_products">Featured Products</div>
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
                <div className="chat-bubble" onClick={() => this.showChat()}>
                    <i className="fas fa-comments"></i>
                </div>
                {this.state.showChat ? <ChatBubble/> : null}
                <Ornament />
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
