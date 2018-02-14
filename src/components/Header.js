import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import { connect } from 'react-redux';
import { login } from '../ducks/reducer';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor() {
        super()
        this.lock = null
        this.login = this.login.bind(this)
    }

    componentDidMount() {
        var options = {
            additionalSignUpFields: [{
              name: "name",
              placeholder: "Enter Your Full-name",
            }],
            auth: {
                redirectUrl: 'http://localhost:3000/home',
                responseType: 'token'
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
    }

    login() {
        this.lock.show()
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
                                    <li><Link to="">Scent 1</Link></li>
                                    <li><Link to="">Scent 2</Link></li>
                                    <li><Link to="">Scent 3</Link></li>
                                    <li><Link to="">Scent 4</Link></li>
                                    <li><Link to="">Scent 5</Link></li>
                                    <li><Link to=""><h3>Sale</h3></Link></li>
                                </ul>
                            </li>
                        </ul>

                        <ul className="header_show">
                            <li><Link to="/display/cologne">Cologne</Link>
                                <ul className="header_has-children">
                                    <li><Link to="/display/cologne"><h3>Shop All Cologne</h3></Link></li>
                                    <li><h3>Shop Scent Family</h3></li>
                                    <li><Link to="">Scent 1</Link></li>
                                    <li><Link to="">Scent 2</Link></li>
                                    <li><Link to="">Scent 3</Link></li>
                                    <li><Link to="">Scent 4</Link></li>
                                    <li><Link to="">Scent 5</Link></li>
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
                        <Link to="/cart">Cart</Link>
                    </div>
                </nav>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { login })(Header)