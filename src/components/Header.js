import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getCart } from '../ducks/reducer'
import { login } from '../ducks/reducer'
import { connect } from 'react-redux'
import Auth0Lock from 'auth0-lock'
import MiniCart from './MiniCart'
import axios from 'axios'


class Header extends Component {
    constructor() {
        super()
        this.state = {
            show: false
        }
    
        this.lock = null
        this.login = this.login.bind(this)
        this.getCart = this.getCart.bind(this)
    }

    componentDidMount() {
        var options = {
            additionalSignUpFields: [{
              name: "name",
              placeholder: "Enter Your Full-name",
            }],
            auth: {
                redirectUrl: 'http://localhost:3000/home',
                responseType: 'token',
            },
            
            allowAutocomplete: true,
            // theme: {
            //     logo: '',
            //     primaryColor: '#2c3e50'
            //   },
            languageDictionary: {
                title: 'Scentric'
            }
          }
        this.lock = new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN, options)
        this.lock.on('authenticated', authResult => {
            this.lock.getUserInfo(authResult.accessToken, (error, user) => {
                axios.post('/login', {userId: user.sub}).then(response => {
                    this.props.login(response.data.user)
                    console.log(response.data.user)
                })
            })
        })
        this.getCart()
    }

    login() {
        this.lock.show()
    }

    getCart(){
        this.props.getCart()
    }

    showMiniCart(){
        this.setState({
            show: true
        })
    }

    hideMiniCart(){
        this.setState({
            show: false
        })
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <nav>
                    <div className="header-left">
                        <ul className="header_show">
                            <li><Link to="/display/perfume">Perfume</Link>
                                <ul className="header_has-children">
                                    <li><Link to="/display/perfume"><h3>Shop All Perfume</h3></Link></li>
                                    <li><h3>Shop Scent Family</h3></li>
                                    <li><Link to="/display/floral">Floral</Link></li>
                                    <li><Link to="/display/citrus">Citrus</Link></li>
                                    <li><Link to="/display/green">Green</Link></li>
                                    <li><Link to="/display/oceanic">Oceanic</Link></li>
                                    <li><Link to="/display/gourmand">Gourmand</Link></li>
                                    <li><Link to=""><h3>Sale</h3></Link></li>
                                </ul>
                            </li>
                        </ul> 

                        <ul className="header_show">
                            <li><Link to="/display/cologne">Cologne</Link>
                                <ul className="header_has-children">
                                    <li><Link to="/display/cologne"><h3>Shop All Cologne</h3></Link></li>
                                    <li><h3>Shop Scent Family</h3></li>
                                    <li><Link to="/display/fresh">Fresh</Link></li>
                                    <li><Link to="/display/earthy">Earthy</Link></li>
                                    <li><Link to="/display/woody">Woody</Link></li>
                                    <li><Link to="/display/spicy">Spicy</Link></li>
                                    <li><Link to="/display/musk">Musk</Link></li>
                                    <li><Link to=""><h3>Sale</h3></Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <Link to="/home" ><img src="https://s3-us-west-1.amazonaws.com/scentric/favicon.ico" alt="logo" className="header_logo"/></Link>
                    <div className="header-right">
                        <Link to="">About</Link>
                        { !user && <a onClick={this.login}>Login</a>}
                        { user && <Link to="/Account">Account</Link>}
                        <Link to="/cart"><span onMouseEnter={()=>{this.showMiniCart()}}>Cart<span className={this.props.cart.qty < 10 ? "qty" : "qty10"}>{this.props.cart.qty}</span></span></Link>
                        {this.state.show ? 
                    <div className="header-minicart" onMouseLeave={() => {this.hideMiniCart()}}>
                        <MiniCart/>
                        <div style={buttonLayout}>
                        <Link to="/checkout"><button className="button">Checkout</button></Link>
                        <Link to="/cart"><button className="button">Go To Cart</button></Link>
                        </div>
                    </div> : null}
                    </div>
                </nav>
            </div>
        )
    }
}


const buttonLayout = {
    textAlign: 'right'
}

const mapStateToProps = state => {
    return {
        user: state.user,
        cart: state.cart
    }
}


export default connect(mapStateToProps, { login, getCart })(Header)