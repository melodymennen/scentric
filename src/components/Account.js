import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';

class Account extends Component {
    render() {
        const { user } = this.props
        return (
            <div>
                <Header />
                {user &&
                <div className="account_base">
                    <div><strong>{user.name}</strong></div>
                    <div><strong>{user.email}</strong></div>
                    <div><strong>{user.auth0_id}</strong></div>
                    <div><img alt="user picture" src={user.picture_Url}/></div>
                </div>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Account)
