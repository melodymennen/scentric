import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUser } from '../ducks/reducer'
import functions from '../utilities/functions'
import Favorites from './AccountFavorites'
import AccountHistory from './AccountHistory'
import AccountInfo from './AccountInfo'
import AccountSettings from './AccountSettings'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'

class Account extends Component {
    constructor() {
        super()
        this.state = {
            menuShow: false,
            route: 'accountinfo',
            accountSettings: false,

            position: '',
            nameInput: '',
            emailInput: '',
            pictureInput: '',

            inputAddress: '',
            inputCity: '',
            inputState: '',
            inputZipCode: '',

            address: {},
            history: [],

        }
    }

    componentWillMount() {
        functions.generateId()
        setTimeout(() => {
            this.setState({ menuShow: true })
        }, 500)
    }

    componentDidMount() {
        this.props.getUser()
        window.scrollTo(0,0)

        if (this.props.user) {
            if (this.props.user.address) {
                let parsedAddress = JSON.parse(this.props.user.address)
                this.setState({
                    inputAddress: parsedAddress.address,
                    inputCity: parsedAddress.city,
                    inputState: parsedAddress.state,
                    inputZipCode: parsedAddress.zipcode,
                })
            }
            this.setState({
                nameInput: this.props.user.name,
                emailInput: this.props.user.email,
                pictureInput: this.props.user.picture_url
            })
        }
    }
    

    updateUser = () => {
        let address = {
            address: this.state.inputAddress,
            city: this.state.inputCity,
            state: this.state.inputState,
            zipcode: this.state.inputZipCode,
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
            this.props.getUser()
            console.log("works", res, this.props.user)
        })
        this.setState({ accountSettings: !this.state.accountSettings })
    }

    accountSettings = () => {
        const { user } = this.props
        this.setState({
            accountSettings: !this.state.accountSettings,
            nameInput: user.name,
            emailInput: user.email,
            pictureInput: user.picture_url,

        })
    }
    
    changeBars = () => {    
        this.setState({ menuShow: !this.state.menuShow })
        this.setState({ position: '' })
        setTimeout(() => {
            this.setState({ position: 'account_indexes-position' })
        }, 500)
    }

    openInfo = () => {
        this.setState({
            route: 'accountinfo'
        })
    }

    openFavorites = () => {
        this.setState({
            route: 'accountfavorites'
        })
    }

    openAccountSettings = () => {
        this.setState({
            route: 'accountsettings'
        })
    }

    openHistory = () => {
        this.setState({
            route: 'accounthistory'
        })

    }

    handleAddressChange = (value) => {
        this.setState({
            inputAddress: value
        })
    }

    handleCityChange = (value) => {
        this.setState({
            inputCity: value
        })
    }

    handleStateChange = (value) => {
        this.setState({
            inputState: value
        })
    }

    handleZipCodeChange = (value) => {
        this.setState({
            inputZipCode: value
        })
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

    logout = ()  => {
        axios.put('/api/logout').then(() => {
            this.props.history.push("/home")
            window.location.reload()
        })
    }


    render() {
        const { user } = this.props
        console.log(user)
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
                            <Link to="/home"><button className="account_link">Home</button></Link>
                                {user && <button className={`account_link ${this.state.showInfo ? 'account_link-open' : ''}`} onClick={this.openInfo}>Account Info</button>}
                                {user && <button className={`account_link ${this.state.showFavorites ? 'account_link-open' : ''}`} onClick={this.openFavorites}>Favorites</button>}
                                {user && <button className={`account_link ${this.state.showHistory ? 'account_link-open' : ''}`} onClick={this.openHistory}>Purchase History</button>}
                                {user && <button className={`account_link ${this.state.showAccountSettings ? 'account_link-open' : ''}`} onClick={this.openAccountSettings}>Change Account Settings</button>}
                                {user && user.is_admin && <Link to="/admin"><button className="account_link2 account_link">Admin</button></Link>}
                                {user && <button className="account_link2 account_link" onClick={this.logout}>Logout</button>}
                            </div>
                        </div>

                    </div>
                    <div className="account_width">
                        <div className="account_base"></div>
                        {user &&
                            <div className={`account_indexes ${this.state.menuShow ? '' : this.state.position}`}>
                                {this.state.route === 'accountinfo' ? 
                                <AccountInfo 
                                    nameInput={this.state.nameInput} 
                                    emailInput={this.state.emailInput} 
                                    pictureInput={this.state.pictureInput}  
                                    inputAddress={this.state.inputAddress}
                                    inputCity={this.state.inputCity}
                                    inputState={this.state.inputState}
                                    inputZipCode={this.state.inputZipCode}
                                    openAccountSettings={this.openAccountSettings}
                                /> : null}
                                {this.state.route === 'accountfavorites' ? <Favorites /> : null}
                                {this.state.route === 'accounthistory' ? <AccountHistory /> : null}
                                {this.state.route === 'accountsettings' ? 
                                <AccountSettings 
                                    nameInput={this.state.nameInput} 
                                    emailInput={this.state.emailInput} 
                                    pictureInput={this.state.pictureInput}  
                                    inputAddress={this.state.inputAddress}
                                    inputCity={this.state.inputCity}
                                    inputState={this.state.inputState}
                                    inputZipCode={this.state.inputZipCode}
                                    accountSettings={this.accountSettings}
                                    accountSettingsState={this.state.accountSettings}
                                    handleNameChange={this.handleNameChange}
                                    handleEmailChange={this.handleEmailChange}
                                    handlePictureChange={this.handlePictureChange}
                                    handleAddressChange={this.handleAddressChange}
                                    handleCityChange={this.handleCityChange}
                                    handleStateChange={this.handleStateChange}
                                    handleZipCodeChange={this.handleZipCodeChange}
                                    updateUser={this.updateUser}
                                /> : null} 
                            </div>}
                        {!user &&
                            <div className="account_no-user">Please login to see your account page. </div>
                        }
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

const mapDispatchToProps = {
    getUser: getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)