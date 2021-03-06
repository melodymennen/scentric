import React, { Component } from 'react'
import functions from '../utilities/functions'
import { getCart, getUser } from '../ducks/reducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from './Header'
import MiniCart from './MiniCart'
import Footer from './Footer'
import axios from 'axios'

class ProductPage extends Component {
    constructor(){
        super()

        this.state = {
            product: {},
            show: false, 
            showAlert: false
        }

        this.getProduct = this.getProduct.bind(this)
        this.addToCart = this.addToCart.bind(this)
        this.showCartSummary = this.showCartSummary.bind(this)
    }

    componentDidMount(){
        this.getProduct()
        functions.generateId()
        this.props.getUser()
        window.scrollTo(0,0)
    }

    getProduct(){
        axios.get(`/api/products/${this.props.match.params.product_id}`).then(response => {
            this.setState({product: response.data[0]})
         })
    }

    addToCart(){
        const body = {
            product_id: this.state.product.id
        }

        axios.post('/api/cart', body).then(response => {
            console.log('item added to cart')
        }).then(() => {
            this.props.getCart()
        }).then(this.showCartSummary())
    }

    addToFavorites(){
        if (this.props.user){
            const body = {
                product_id: this.state.product.id
            }
            return(
                axios.post('/api/favorites', body).then(() => {
                    console.log('item added to favorites')
                })
            )
        } else {
            this.setState({showAlert: true})
            setTimeout(() => {this.setState({
                showAlert: false
            })}, 4000)
        }
    }

    showCartSummary(){
        this.setState({
            show: true
        })
        setTimeout(() => {this.setState({
            show: false
        })}, 4000)
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.show ? 
                    <div className="product-page-minicart"> 
                        <MiniCart/>
                    <div style={buttonLayout}>
                        <Link to="/checkout"><button className="button">Checkout</button></Link>
                        <Link to="/cart"><button className="button">Go To Cart</button></Link>
                    </div>
                    </div> : null}
                <div className="product-page-body">
                    <img src={this.state.product.image_url} alt={this.state.product.name} />
                    <div className="product-page-info">
                        <div className="product-page-name">{this.state.product.name}</div>
                        <div className="product-page-price">${this.state.product.price}</div>
                        <div className="product-page-description">{this.state.product.description}.</div>
                        <div>
                            <button className="button" onClick={() => this.addToCart()}>Add To Cart</button>
                            <button className="button" onClick={() => this.addToFavorites()}>Add To Favorites</button>
                            {this.state.showAlert ? 
                                <div className="contact-us-email-sent">
                                    You must log in first! 
                                </div> : null
                            }
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const buttonLayout = {
    textAlign: 'right'
}


function mapStateToProps(state){
    return {
        cart: state.cart, 
        user: state.user
    }
}

const mapDispatchToProps = {
    getCart: getCart, 
    getUser: getUser
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);