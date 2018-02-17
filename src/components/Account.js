import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import functions from '../utilities/functions'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'

class Account extends Component {
    constructor() {
        super()
        this.state = {
            showInfo: true,
            showFavorites: false,
            showAccountSettings: false,
            menuShow: false,
            position: '',
            nameInput: '',
            emailInput: '',
            pictureInput: '',
            accountSettings: false,

            inputAddress: '',
            inputCity: '',
            inputState: '',
            inputZipCode:    '',

        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({ menuShow: true })
        }, 1000)
        functions.generateId()
    }
    openInfo = () => {
        this.setState({
            showInfo: true,
            showFavorites: false,
            showAccountSettings: false
        })
    }
    openFavorites = () => {
        this.setState({
            showFavorites: true,
            showInfo: false,
            showAccountSettings: false
        })
    }

    openAccountSettings = () => {
        this.setState({
            showAccountSettings: true,
            showInfo: false,
            showFavorites: false
        })
    }

    changeBars = () => {
        this.setState({ menuShow: !this.state.menuShow })
        this.setState({ position: '' })
        setTimeout(() => {
            this.setState({ position: 'account_indexes-position' })
        }, 500)
    }

    handleEmailChange = (value) => {
        this.setState({ emailInput: value })
    }

    handleNameChange = (value) => {
        this.setState({ nameInput: value })
    }

    handlePictureChange = (value) => {
        this.setState({ pictureInput: value })
    }

    accountSettings = () => {
        this.setState({
            accountSettings: !this.state.accountSettings,
            nameInput: this.props.user.name,
            emailInput: this.props.user.email,
            pictureInput: this.props.user.picture_url,
        })
    }

    updateUser = () => {
        let address = {
            address: this.state.inputAddress,
            city: this.state.inputCity,
            state: this.state.inputState,
            zipcode: this.state.inputZipCode
        }

        let addressString = JSON.stringify(address)
        console.log(addressString)
        
        let myobj = {
            newName: this.state.nameInput,
            newEmail: this.state.emailInput,
            newPicture: this.state.pictureInput,

            address: addressString
        }
        console.log(myobj)
        axios.post(`/api/updateuser`, myobj).then((res) => {
            console.log("works", res)
        })
    }

    address = () => {
        let parsedAddress = JSON.parse(this.props.user.address)
        if (this.props.user.address === null) {
            return (<div className="account_address">It looks like you don't have and address set up click <a onClick={this.openAccountSettings}>Here</a> to set one up</div>)
        } else {
            return (<div>Address: {parsedAddress.address} {parsedAddress.city}, {parsedAddress.state}, {parsedAddress.zipcode}</div>)
        }
    }


    handleAddressChange = (value) => {
        console.log(value)
        this.setState({
            inputAddress: value
        })
    }

    handleSecAddressChange = (value) => {
        console.log(value)
        this.setState({
            inputSecAddress: value
        })
    }

    handleCityChange = (value) => {
        console.log(value)
        this.setState({
            inputCity: value
        })
    }

    handleStateChange = (value) => {
        console.log(value)
        this.setState({
            inputState: value
        })
    }

    handleZipCodeChange = (value) => {
        console.log(value)
        this.setState({
            inputZipCode: value
        })
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <Header />
                <div className="account_flex">
                    <div>
                        <a className="bars" onClick={this.changeBars}>
                            <div className={`bar1 ${this.state.menuShow ? 'bar1x' : ''}`}></div>
                            <div className={`bar2 ${this.state.menuShow ? 'bar2x' : ''}`}></div>
                            <div className={`bar3 ${this.state.menuShow ? 'bar3x' : ''}`}></div>
                        </a>


                        <div className={`account_menu ${this.state.menuShow ? 'account_menuShow' : ''}`}>
                            <div className="account_sidebar">
                                <button className="account_link"><Link to="/home">Home</Link></button>
                                {user && <button className={`account_link ${this.state.showInfo ? 'account_link-open' : ''}`} onClick={this.openInfo}>Account Info</button>}
                                {user && <button className={`account_link ${this.state.showFavorites ? 'account_link-open' : ''}`} onClick={this.openFavorites}>Favorites</button>}
                                {user && <button className={`account_link ${this.state.showAccountSettings ? 'account_link-open' : ''}`} onClick={this.openAccountSettings}>Change Account Settings</button>}
                            </div>
                        </div>

                    </div>
                    <div className="account_width">
                        <div className="account_base">
                        </div>
                        {user &&
                            <div className={`account_indexes ${this.state.menuShow ? '' : this.state.position}`}>


 {/* ////////////////////////////// account section //////////////////////////////// */}


                                <div className={`account_container ${this.state.showInfo ? 'account_show-info' : ''}`}>
                                    <div className="account_info-excerpt">
                                        <div className="account_flex_profile">
                                            <div className="account_greeting">
                                                <img className="account_picture" alt="user" src={user.picture_url} />
                                                <div>Welcome {user.name}!</div>
                                            </div>
                                        </div>
                                        <div className="account_flex account_space">
                                            <div className="account_flex_profile">
                                                <div>Account Name: {user.name}</div>
                                                <div>Account id: {this.props.user.id}</div>
                                            </div>
                                            <div className="account_flex_profile">
                                                <div>Email: {user.email}</div>
                                                <div>Auth0_id: {user.auth0_id}</div>
                                            </div>
                                        </div>
                                        <div className="account_space">
                                            {this.address()}
                                        </div>
                                        <div className="account_date">
                                            <div>You have been a user since 2018!</div>
                                            <div>You have {this.props.cart.qty} Items in you cart. Click <Link to="/Cart">Here</Link> to checkout</div>
                                            <div>If you wish to change your account settings click <a onClick={this.openAccountSettings}>Here</a></div>
                                        </div>
                                    </div>
                                </div>


{/* ////////////////////////////// Favorites section //////////////////////////////// */}


                                <div className={`account_container ${this.state.showFavorites ? 'account_show-favorites' : ''}`}>
                                    <div className="account_favorites-excerpt">
                                        This is where the favorites go
                                    </div>
                                </div>
                               
                               
                               
{/* ////////////////////////////// account settings section //////////////////////////////// */}


                                <div className={`account_container ${this.state.showAccountSettings ? 'account_show-account-settings' : ''}`}>
                                    <div>
                                        <button onClick={this.accountSettings}>Change Account Settings</button>
                                    </div>
                                    <div className={`account_settings-excerpt ${this.state.accountSettings ? "account_settings-excerpt-show" : ""}`}>
                                        <div>Change Name: <input defaultValue={user.name} onChange={event => this.handleNameChange(event.target.value)} /></div>
                                        <div>Change Email: <input defaultValue={user.email} onChange={event => this.handleEmailChange(event.target.value)} /></div>
                                        <div>Change Profile Picture:  <input defaultValue={user.picture_url} onChange={event => this.handlePictureChange(event.target.value)} /></div>
                                        <div>Auth0_id: {user.auth0_id}</div>
                                    </div>
                                    <div className="checkout_sec_wrapper">
                                        <div><input value={this.state.inputAddress}
                                            onChange={(e) => this.handleAddressChange(e.target.value)}
                                            placeholder="Street Address" /></div>
                                        </div>
                                    <div className="checkout_third_wrapper">
                                        <input 
                                        onChange={(e) => this.handleCityChange(e.target.value)}
                                        placeholder="City" />
                                        <select onChange={(e) => this.handleStateChange(e.target.value)}>
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
                                            onChange={(e) => this.handleZipCodeChange(e.target.value)}
                                            placeholder="Zip Code" />
                                    </div>
                            <button onClick={this.updateUser}>submit</button>
                                </div>
                            </div>}
                        {!user &&
                            <div className="account_no-user">Please login to see your account page
                    </div>}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Account)