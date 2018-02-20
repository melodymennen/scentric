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
    }

    render() {
        return (
            <div>
                <Header />
                <div className="faq-body">
                    <div className="faq-title">FAQS</div>
                    <div className="faq-question">QUESTIONS? </div>
                    <div className="faq-answer">Contact us at customercare@scentric.com and make sure to include your full name and order number, if applicable, so we can expedite your inquiry.</div>
                    <div className="faq-question">CUSTOMER SERVICE HOURS</div>
                    <div className="faq-answer">24 hours a day, 7 days a week. Please allow up to 1 day for a response. </div>
                    <div className="faq-question">HOW LONG WILL IT TAKE TO GET MY ORDER?</div>
                    <div className="faq-answer">For orders going to the contiguous 48 states, ship rates and times are as follows:<br/><br/>
                        STANDARD: $5 (5 Business Days)<br/>
                        UPGRADED: $10 (3 Business Days)<br/>
                        EXPRESS: $15 (2 Business Days)<br/><br/>
                        For orders going to Alaska and Hawaii, STANDARD shipping will take 2-4 weeks.
                        For orders going to Military Bases, STANDARD shipping will take 4 weeks. 
                        Please allow an additional 24 hours to process your order.</div>
                    <div className="faq-question">WHERE’S MY ORDER?</div>
                    <div className="faq-answer">If your order seems to be taking longer than anticipated, as well as for any further questions on shipping, please contact customercare@scentric.com.</div>
                    <div className="faq-question">CAN I TRACK MY ORDER?</div>
                    <div className="faq-answer">Yes, following an order confirmation, you should receive a second email with your tracking number once your order has been shipped. If you do not receive a shipping confirmation email, please contact customercare@scentric.com.</div>
                    <div className="faq-question">WHAT IS YOUR RETURN POLICY?</div>
                    <div className="faq-answer">Change of heart? We’ll happily return (refund) your full-priced merchandise, within 30 days of delivery. Must be in resalable condition with original packaging. Merchandise received after 30 days or not received in original condition will be issued a Merchandise Credit available to be used online. <br/><br/>
                        Please allow 2-3 weeks for the receipt and processing of your exchange/return. A credit will be issued to the original form of payment. You will receive confirmation by email when your return is completed. Shipping and other charges are non-refundable.<br/><br/>
                        For manufacturing defects, exchanges are available within 3 months of purchase.<br/><br/>
                        Contact us at customercare@scentric.com for more information and make sure to include your full name and order number.</div>
                    <div className="faq-question">CAN I CHANGE OR CANCEL MY ORDER?</div>
                    <div className="faq-answer">We start working on your order as soon as we get it, so we are unable to make any changes or modifications to an order after it has been placed and confirmed.</div>
                    <div className="faq-question">WHAT SHOULD I DO IF I RECEIVE AN ERROR MESSAGE WHEN TRYING TO PLACE AN ORDER? </div>
                    <div className="faq-answer">Confirm you’ve properly filled out all details including your name, email, shipping address and phone number. If you are still having issues, please contact customercare@scentric.com.</div>
                    <div className="faq-question">WHAT IF I HAVEN’T RECEIVED A CONFIRMATION EMAIL?</div>
                    <div className="faq-answer">As soon as your order is placed, you should receive an email confirmation. For further questions, please contact customercare@scentric.com. </div>
                    <div className="faq-question">IS IT SAFE TO SHOP ON SCENTRIC.COM?</div>
                    <div className="faq-answer">Absolutely! All of your payment information is kept safe and secure and you can check out with your credit card.</div>
                    <div className="faq-question">WHAT IF I RECEIVE A DAMAGED ITEM?</div>
                    <div className="faq-answer">Please contact our customer care department immediately at customercare@scentric.com </div>
                    <div className="faq-question">WHAT DOES "FINAL" SALE MEAN?</div>
                    <div className="faq-answer">“Final Sale” means the specified merchandise is not eligible for return.</div>
                    <div className="faq-question">CAN I PLACE AN ORDER WITHOUT REGISTERING?</div>
                    <div className="faq-answer">Yes, of course! But we think it will make your life easier if you create an account so you can track your orders more easily.</div>
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