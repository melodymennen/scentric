import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer-body">
                <div>
                    <Link to="/FAQ">FAQ</Link>
                    <Link to="/ContactUs">CONTACT</Link>
                </div>
                <div>
                © 2018 Scentric, LLC. All rights reserved.
                </div>
                <div className="disclaimer">
                Scentric and its products are fictional. Orders placed will not be fulfilled. 
                </div>
            </div>
        )
    }
}