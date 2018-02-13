import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
    render() {
        return (
            <div>
                <div>SCENTRIC</div>
                <Link to="/home">Enter Site</Link>
            </div>
        );
    }
}

export default LandingPage;