import React, { Component } from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { login } from '../ducks/reducer'
import axios from 'axios'
import Header from './Header'



class Login extends Component {
    constructor() {
        super()
        this.lock = null
        this.login = this.login.bind(this)
    }

    componentDidMount() {
        var options = {
            additionalSignUpFields: [{
              name: "Name",
              placeholder: "enter your name",
              // The following properties are optional
              prefill: "Please Enter Your Name",
              icon: "https://s3-us-west-1.amazonaws.com/scentric/contact-1293388_960_720.png"
            }],
            
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
                    this.props.history.push('/home')
                })
            })
        })
    }

    login() {
        this.lock.show()
    }

    render() {
        return (
            <div >
                <Header />
                <h3>Click to Sign-In</h3>
                <div className="login_button"><button onClick={this.login}>Log In</button></div>
            </div>


        );
    }
}

export default connect(null, { login })(Login)