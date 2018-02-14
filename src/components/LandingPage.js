import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
    render() {
        return (
            <div className="landingpage">
                <div className="landingpage_title"><img className="logo" src="https://s3-us-west-1.amazonaws.com/scentric/favicon.ico"/>SCENTRIC</div>
                <div><img src="https://s3-us-west-1.amazonaws.com/scentric/perfumebottle.jpg" alt="hero" width="500px"/></div>
                <Link className="noDecor" to="/home"><div className="enter">Enter Site</div></Link>
            </div>
        );
    }
}

export default LandingPage;