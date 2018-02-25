import React, { Component } from 'react'
import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom'
import { getCart } from '../ducks/reducer'
import { login } from '../ducks/reducer'
import { connect } from 'react-redux'
import Auth0Lock from 'auth0-lock'
import MiniCart from './MiniCart'
import axios from 'axios'

const duration = 300

const defaultStyle = {
    transition: `height ${duration}ms ease-in-out`,
    height: '0',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    paddingTop: '65px',
    overflow: 'hidden',
    width: '100%',
    position: 'fixed',
    zIndex: '9',
}
const transitionStyles = {
    entering: { height: 0 },
    entered: { height: '200px' },
}
const Fade = ({ in: inProp, user:user, login:login}) => (
    <Transition in={inProp} user={user} login={login}timeout={duration}>
        {(state) => (
            <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
            }} className="header_drop-down-menu">
                <div className="header_drop-left">
                    {!user && <div><a onClick={login}>Login</a></div>}
                    {user && <div><Link to="/Account">Account</Link></div>}
                    <div><Link to="">About</Link></div>
                    <div><Link to="/sale"><h3>Sale</h3></Link></div>
                </div>
                <div>
                    <div><Link to="/display/perfume">Perfume</Link></div>
                    <ul>
                        <li><Link to="/display/floral">Floral</Link></li>
                        <li><Link to="/display/citrus">Citrus</Link></li>
                        <li><Link to="/display/green">Green</Link></li>
                        <li><Link to="/display/oceanic">Oceanic</Link></li>
                        <li><Link to="/display/gourmand">Gourmand</Link></li>
                    </ul>
                </div>
                <div>
                    <div><Link to="/display/cologne">Cologne</Link></div>
                    <ul>
                        <li><Link to="/display/fresh">Fresh</Link></li>
                        <li><Link to="/display/earthy">Earthy</Link></li>
                        <li><Link to="/display/woody">Woody</Link></li>
                        <li><Link to="/display/spicy">Spicy</Link></li>
                        <li><Link to="/display/musk">Musk</Link></li>
                    </ul>
                </div>
            </div>
        )}
    </Transition>
)




class Header extends Component {
    constructor() {
        super()
        this.state = {
            show: false,
            menuShow: false
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
                axios.post('/login', { userId: user.sub }).then(response => {
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

    getCart() {
        this.props.getCart()
    }

    showMiniCart() {
        this.setState({
            show: true
        })
    }

    hideMiniCart() {
        this.setState({
            show: false
        })
    }

    handleToggle = () => {
        this.setState({ menuShow: !this.state.menuShow })
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <nav>
                    <a className="header_bars" onClick={this.handleToggle}>
                        <div>
                            <div className={`header_bar1 ${this.state.menuShow ? 'bar1x' : ''}`}></div>
                            <div className={`header_bar2 ${this.state.menuShow ? 'bar2x' : ''}`}></div>
                            <div className={`header_bar3 ${this.state.menuShow ? 'bar3x' : ''}`}></div>
                        </div>
                    </a>
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
                                    <li><Link to="/sale"><h3>Sale</h3></Link></li>
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
                                    <li><Link to="/sale"><h3>Sale</h3></Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <Link to="/home" ><img src="https://s3-us-west-1.amazonaws.com/scentric/favicon.ico" alt="logo" className="header_logo" /></Link>
                    <div className="header-right">
                        <Link to="" className="header_about">About</Link>

                        {!user && <a className="header_login" onClick={this.login}>Login</a>}
                        {user && <Link to="/Account" className="header_account">Account</Link>}

                        <Link to="/cart"><span onMouseEnter={() => { this.showMiniCart() }}>Cart<span className={this.props.cart.qty < 10 ? "qty" : "qty10"}>{this.props.cart.qty}</span></span></Link>

                        {this.state.show ?
                            <div className="header-minicart" onMouseLeave={() => { this.hideMiniCart() }}>
                                <div className="to_scroll"><MiniCart /></div>
                                <div style={buttonLayout}>
                                    <Link to="/checkout"><button className="button">Checkout</button></Link>
                                    <Link to="/cart"><button className="button">Go To Cart</button></Link>
                                </div>
                            </div> : null
                        }
                    </div>
                </nav>
                <Fade in={!!this.state.menuShow} user={user} login={this.login}/>
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