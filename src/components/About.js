import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCart, getUser } from '../ducks/reducer'
import functions from '../utilities/functions'
import Header from './Header'
import Footer from './Footer'

class About extends Component {

    componentWillMount(){
        functions.generateId()        
    }

    componentDidMount() {
        this.getCart()
        this.props.getUser()
        window.scrollTo(0,0)
    }

    getCart(){
        this.props.getCart()
    }    

    render() {
        return (
            <div>
                <Header/>
                <div className="about_body">
                    <div className="about_title">ABOUT</div>
                    <div className="about_about">
                        <div className="about_heading">What is Scentric?</div> 
                        <div className="about_info">
                            Scentric is an online retail store for (fictional) perfumes and colognes. It was created as a portfolio piece by Lisa Herzberg, Melody Rosado and Matt Wearden.
                        </div> 
                    </div>
                    <div className="about_tech">
                        <div className="about_heading">Technologies Used:</div> 
                        <div className="about_info">
                            We used many technologies when making this project including but not limited to: 
                            <br/> <br/>
                            React | Redux | JavaScript(ES6) | CSS | Sass | NodeJS | ExpressJS | Massive | PostgreSQL | Sockets | Auth0 | ChartJS
                        </div> 
                    </div>
                    <div className="about_team">
                        <div className="about_heading">Our Team</div> 
                        <div className="about_info team-wrap">
                            <div className="about_team-info">
                                Lisa Herzberg
                                <br/>
                                <a href="https://www.linkedin.com/in/lisaherzberg/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
                                <a href="https://github.com/Lisamarie73187" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
                                <a href="" target="_blank" rel="noopener noreferrer"><i class="fas fa-globe"></i></a>
                            </div>
                            <div className="about_team-info">
                                Melody Rosado
                                <br/>                                
                                <a href="https://www.linkedin.com/in/melodymennen/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
                                <a href="https://github.com/melodymennen" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
                                <a href="https://melodymennen.github.io/" target="_blank" rel="noopener noreferrer"><i class="fas fa-globe"></i></a>
                            </div>
                            <div className="about_team-info">
                                Matt Wearden
                                <br/>                                
                                <a href="https://www.linkedin.com/in/matthew-werdean-742334158/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
                                <a href="https://github.com/Mwerdean" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
                                <a href="" target="_blank" rel="noopener noreferrer"><i class="fas fa-globe"></i></a>
                            </div>
                        </div> 
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = {
    getCart: getCart, 
    getUser: getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(About)