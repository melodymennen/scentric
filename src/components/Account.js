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
        let myobj = {
            newName: this.state.nameInput,
            newEmail: this.state.emailInput,
            newPicture: this.state.pictureInput
        }
        console.log(myobj)
        axios.post(`/api/updateuser`, myobj).then((res) => {
            console.log("works", res)
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
                                        <div>You have been a user since 2018!</div>
                                        <div>You have {this.props.cart.qty} Items in you cart. Click <a>Here</a> to checkout</div>
                                    </div>
                                </div>
                                <div className={`account_container ${this.state.showFavorites ? 'account_show-favorites' : ''}`}>
                                    <div className="account_favorites-excerpt">
                                        This is where the favorites go
                                </div>
                                </div>
                                <div className={`account_container ${this.state.showAccountSettings ? 'account_show-account-settings' : ''}`}>
                                    <div>
                                        <button onClick={this.accountSettings}>Change Account Settings</button>
                                    </div>
                                    <div className={`account_settings-excerpt ${this.state.accountSettings ? "account_settings-excerpt-show" : ""}`}>
                                        <div>Change Name: <input defaultValue={user.name} onChange={event => this.handleNameChange(event.target.value)} /></div>
                                        <div>Change Email: <input defaultValue={user.email} onChange={event => this.handleEmailChange(event.target.value)} /></div>
                                        <div>Change Profile Picture:  <input defaultValue={user.picture_url} onChange={event => this.handlePictureChange(event.target.value)} /></div>
                                        <div> Auth0_id: {user.auth0_id}</div>
                                        <button onClick={this.updateUser}>submit</button>
                                    </div>
                                </div>
                            </div>}
                        {!user &&
                            <div className="account_no-user">Please login to see your account page
                    </div>}
                    </div>
                </div>
                <Footer/>
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