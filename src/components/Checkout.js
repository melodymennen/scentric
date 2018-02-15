import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import functions from '../utilities/functions'
import MiniCart from './MiniCart'
import Header from './Header'

export default class Checkout extends Component {
    constructor(){
        super()
            this.state = {
                inputName: '',
                inputEmail: '',
                inputAddress: '',
                inputSecAddress: '',
                inputCity: '',
                inputState: '',
                inputZipCode: '',
            }
    }

    componentDidMount(){
        functions.generateId()
    }

    handleNameChange(value){
        console.log(value)
        this.setState({
            inputName: value
        })
    }

    handleEmailChange(value){
        console.log(value)
        this.setState({
            inputEmail: value
        })
    }

    handleAddressChange(value){
        console.log(value)
        this.setState({
            inputAddress: value
        })
    }

    handleSecAddressChange(value){
        console.log(value)
        this.setState({
            inputSecAddress: value
        })
    }

    handleCityChange(value){
        console.log(value)
        this.setState({
            inputCity: value
        })
    }

    handleStateChange(value){
        console.log(value)
        this.setState({
            inputState: value
        })
    }

    handleZipCodeChange(value){
        console.log(value)
        this.setState({
            inputZipCode: value
        })
    }


    render() {
        return (
            <div>
                <Header/>
                    <div className="checkout_main_body">
                        <div className="checkout_body_form">
                            <div className="checkout_title">Check Out</div>
                                <div className="checkout_name_email_flex">
                                    <input value={this.state.inputName} 
                                    onChange={(e) =>this.handleNameChange(e.target.value)} 
                                    placeholder="Enter Your Full Name"/>
                                    <input value={this.state.inputEmail}
                                    onChange={(e) =>this.handleEmailChange(e.target.value)}placeholder="Email Address"/>
                                </div>
                            <div className="checkout_sec_wrapper">
                                <div><input value={this.state.inputAddress}
                                onChange={(e) =>this.handleAddressChange(e.target.value)}
                                placeholder="Street Address"/></div>
                                <div><input value={this.state.inputSecAddress}
                                onChange={(e) =>this.handleSecAddressChange(e.target.value)}
                                placeholder="2nd Address and/or Apartment Number"/>
                                </div>
                            </div>
                            <div className="checkout_third_wrapper">
                                <input placeholder="City"/>
                                <select onChange={(e) =>this.handleStateChange(e.target.value)}>
                                    <option value="State">State</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </select>
                                <input value={this.state.inputZipCode}
                                onChange={(e) =>this.handleZipCodeChange(e.target.value)}
                                placeholder="Zip Code"/>
                            </div>
                        </div>
                    <div className="checkout_minicart"> 
                        <MiniCart/>
                        <div className="checkout_button_tocart">
                            <Link to="/cart"><button>Back to Cart</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}