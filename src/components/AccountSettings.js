import React, { Component } from 'react';
import { connect } from 'react-redux'

class AccountSettings extends Component {
    componentDidMount() {
        window.scrollTo(0,0)
    }
    
    address = () => {
        if (this.props.user.address) {
            return (<div className="account_address">Address: <div>{this.props.inputAddress} {this.props.inputCity}, {this.props.inputState}, {this.props.inputZipCode}</div></div>)
        } else {
            return (<div className="account_address">It looks like you don't have and address set up. Edit your account settings to add one!</div>)
        }
    }
    
    render() {
        return (
            <div className='account_container account_show-account-settings'>
            <div className="account_shadow">
                <div>
                    <button className="button" onClick={this.props.accountSettings}>Edit Account Settings</button>
                </div>

                <div className={`account_before-excerpt ${this.props.accountSettingsState ? "account_settings-excerpt-hide" : ""}`}>
                    <div>Name: <div>{this.props.nameInput}</div></div>
                    <div>Email: <div>{this.props.emailInput}</div></div>
                    <div>Profile Picture: <div>{this.props.pictureInput}</div></div>
                    {this.address()}
                </div>
                <div className={`account_settings-excerpt ${this.props.accountSettingsState ? "account_settings-excerpt-show" : ""}`}>
                    <div>Name: 
                    <input defaultValue={this.props.nameInput} onChange={event => this.props.handleNameChange(event.target.value)} /></div>
                    <div>Email:<input defaultValue={this.props.emailInput} onChange={event => this.props.handleEmailChange(event.target.value)} /></div>
                    <div>Profile Picture:  <input defaultValue={this.props.pictureInput} onChange={event => this.props.handlePictureChange(event.target.value)} /></div>


                    <div> <div className="account_address_settings">Address: </div>
                    <div className="account_selector">
                            <input className="account_input_address" defaultValue={this.props.inputAddress}
                                onChange={(e) => this.props.handleAddressChange(e.target.value)}
                                placeholder="Street Address" />
                            <input className="account_input_short"
                                onChange={(e) => this.props.handleCityChange(e.target.value)}
                                placeholder="City"
                                defaultValue={this.props.inputCity} />
                            <select className="account_input_short" value={this.props.inputState} onChange={(e) => this.props.handleStateChange(e.target.value)}>
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
                            <input className="account_input_short" defaultValue={this.props.inputZipCode}
                                onChange={(e) => this.props.handleZipCodeChange(e.target.value)}
                                placeholder="Zip Code" />
                        </div>
                    </div>
                    <div className="account_button">
                        <button className="button account_button" onClick={this.props.updateUser}>submit</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(AccountSettings)