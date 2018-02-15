import React, { Component } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import functions from '../utilities/functions'

class Account extends Component {
    constructor() {
        super()
        this.state = {
            showInfo: true,
            showFavorites: false,
            showAccountSettings: false,
            menuShow: false,
            nameInput: '',
            emailInput: '',
            pictureInput: ''
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

    updateUser = () => {
        let myobj = {
            newName: this.state.nameInput,
            newEmail: this.state.emailInput,
            newPicture: this.state.pictureInput
        }
        axios.put(`/updateuser/${this.props.user.id}`, myobj).then((res) => {
            console.log(res)
        }).then(() => {
            axios.get('/getuser').then((res) => {
                console.log(res)
            })
        })
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <Header />
                <div className="account_base">
                </div>
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
                    {user &&
                        <div className={`account_indexes ${this.state.menuShow ? '' : 'account_indexes-position'}`}>
                            <div className={`account_container ${this.state.showInfo ? 'account_show-info' : ''}`}>
                                <div className="account_info-excerpt">
                                    <div>Name: {user.name}</div>
                                    <div>Email: {user.email}</div>
                                    <div>Auth0_id: {user.auth0_id}</div>
                                </div>
                                <div><img alt="user" src={user.picture_Url} /></div>
                            </div>
                            <div className={`account_container ${this.state.showFavorites ? 'account_show-favorites' : ''}`}>
                                <div className="account_favorites-excerpt">
                                    This is where the favorites go
                                </div>
                            </div>
                            <div className={`account_container ${this.state.showAccountSettings ? 'account_show-account-settings' : ''}`}>
                                <div className="account_settings-excerpt">
                                <div>Change Name: <input defaultValue={user.name} onChange={ event => this.handleNameChange(event.target.value) }/></div>
                                <div>Change Email: <input defaultValue={user.email} onChange={ event => this.handleEmailChange(event.target.value) }/></div>
                                <div>Change Profile Picture:  <input defaultValue={user.picture_Url} onChange={ event => this.handlePictureChange(event.target.value) }/></div>
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
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Account)
