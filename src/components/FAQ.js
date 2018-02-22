import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../ducks/reducer'
import functions from '../utilities/functions'
import Header from './Header'
import Footer from './Footer'

class FAQ extends Component {

    componentDidMount(){
        functions.generateId()
        this.props.getUser()
        window.scrollTo(0,0)
    }

    render() {
        return (
            <div>
                <Header />
                <div className="faq-body">
                    <div className="faq-title">FAQS</div>
                    <div className="faq-question">QUESTIONS?</div>
                    <div className="faq-answer">Consult the Googles and let us know what you find out.</div>
                    <div className="faq-question">CUSTOMER SERVICE HOURS</div>
                    <div className="faq-answer">24 hours a day, 7 days a week. Please don't expect a response though. </div>
                    <div className="faq-question">HOW LONG WILL IT TAKE TO GET MY ORDER?</div>
                    <div className="faq-answer">I don't know, how long will it take to get to the center of a tootsie pop?</div>
                    <div className="faq-question">WHERE’S MY ORDER?</div>
                    <div className="faq-answer">If your order seems to be taking longer than anticipated, it's because it's not coming. </div>
                    <div className="faq-question">CAN I TRACK MY ORDER?</div>
                    <div className="faq-answer">Yes, following an order confirmation, you should receive a second email with your tracking number once your order has been shipped. JK, this is fake store, we don't actually sell anything.</div>
                    <div className="faq-question">WHAT IS YOUR RETURN POLICY?</div>
                    <div className="faq-answer">Change of heart? Don't worry about it! Your order was fake anyway.</div>
                    <div className="faq-question">CAN I CHANGE OR CANCEL MY ORDER?</div>
                    <div className="faq-answer">No need, orders placed are not processed since this is a fake store and all.</div>
                    <div className="faq-question">WHAT SHOULD I DO IF I RECEIVE AN ERROR MESSAGE WHEN TRYING TO PLACE AN ORDER? </div>
                    <div className="faq-answer">Confirm you’ve properly filled out all details including your name, email, shipping address and phone number. If you are still having issues, it's probably because you're doing it wrong.</div>
                    <div className="faq-question">WHAT IF I HAVEN’T RECEIVED A CONFIRMATION EMAIL?</div>
                    <div className="faq-answer">You won't be getting any emails from us. We'd actually be surprised if you did. </div>
                    <div className="faq-question">IS IT SAFE TO SHOP ON SCENTRIC.COM?</div>
                    <div className="faq-answer">Absolutely! All of your payment information is kept safe and secure in Narnia so you can shop without worry.</div>
                    <div className="faq-question">WHAT IF I RECEIVE A DAMAGED ITEM?</div>
                    <div className="faq-answer">That would really suck. Oh well.</div>
                    <div className="faq-question">CAN I PLACE AN ORDER WITHOUT REGISTERING?</div>
                    <div className="faq-answer">Yes, of course! But we think it will be fun if you create an account so you can waste some time.</div>
                    <div className="faq-question">CAN I ACTUALLY BUY THESE AWESOME PRODUCTS?</div>
                    <div className="faq-answer">Unfortunately, no you can't. This site and all its products are fictional. </div>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapDispatchToProps = {
    getUser: getUser
}

export default connect(null, mapDispatchToProps)(FAQ)