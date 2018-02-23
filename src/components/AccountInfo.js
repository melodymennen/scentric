import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class AccountInfo extends Component {

    componentDidMount() {
        window.scrollTo(0,0)
    }
    
    address = () => {
        if (this.props.user.address) {
            return (<div className="account_address">Address: <div>{this.props.inputAddress} {this.props.inputCity}, {this.props.inputState}, {this.props.inputZipCode}</div></div>)
        } else {
            return (<div className="account_address">It looks like you don't have an address set up. Edit your account settings to add one!</div>)
        }
    }

    render() {
        return (
            <div className='account_show-info'>
                <div className="account_flex_profile">
                    <div className="account_greeting">
                        <img className="account_picture" alt="user" src={this.props.pictureInput} />
                        <div>Welcome {this.props.nameInput}!</div>
                    </div>
                </div>
                <div className="account_flex account_space">
                    <div className="account_flex_profile">
                        <div>Name: {this.props.nameInput}</div>
                    </div>
                    <div className="account_flex_profile">
                        <div>Email: {this.props.emailInput}</div>
                    </div>
                </div>
                <div className="account_space">
                    {this.address()}
                </div>
                <div className="account_date">
                    <div>You have been a user since 2018!</div>
                    <div>You have {this.props.cart.qty} items in your cart. Click <Link to="/Cart">Here</Link> to checkout.</div>
                    <div>If you wish to change your account settings click <a onClick={this.props.openAccountSettings}>Here</a>.</div>
                </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        user: state.user
    }
}

export default connect(mapStateToProps)(AccountInfo)