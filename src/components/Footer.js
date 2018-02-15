import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer-body">
                <div>
                    <Link to="/FAQ">FAQ</Link>
                    <Link to="">CONTACT</Link>
                </div>
                <div>
                © 2018 Scentric, LLC. All rights reserved.
                </div>
            </div>
        )
    }
}