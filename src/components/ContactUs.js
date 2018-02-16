import React, { Component } from 'react'
import functions from '../utilities/functions'
import Header from './Header'
import Footer from './Footer'

class ContactUs extends Component {
    constructor(){
        super()

        this.state = {
            name: '',
            email: '',
            message: '', 
            show: false
        }

        this.handleNameInput = this.handleNameInput.bind(this)
        this.handleEmailInput = this.handleEmailInput.bind(this)
        this.handleMessageInput = this.handleMessageInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        functions.generateId()
    }

    handleNameInput(value){
        this.setState({ name: value })
    }

    handleEmailInput(value){
        this.setState({ email: value })
    }

    handleMessageInput(value){
        this.setState({ message: value })
    }

    handleSubmit(){
        this.setState({
            name: '',
            email: '',
            message: '', 
            show: true
        })
        setTimeout(() => {this.setState({
            show: false
        })},4000)
    }

    render() {
        return (
            <div>
                <Header />
                <div className="contact-us-body">
                    <div className="title">Contact Us</div>
                    <div>
                        <input value={this.state.name} onChange={event => this.handleNameInput(event.target.value)} placeholder="Name" />
                        <input value={this.state.email} onChange={event => this.handleEmailInput(event.target.value)} placeholder="Email" />
                    </div>
                    <div>
                        <textarea value={this.state.message} onChange={event => this.handleMessageInput(event.target.value)} placeholder="Message" />
                    </div>
                    <div className="button-house">
                        <button onClick={() => this.handleSubmit()}>Send Email</button>
                        {this.state.show ? 
                            <div className="contact-us-email-sent">
                                Your email has been sent! 
                            </div> : null
                        }
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default ContactUs