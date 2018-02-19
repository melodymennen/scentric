import React, { Component } from 'react'
import Carousel from 'nuka-carousel'



class Hero extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mixins: [Carousel.ControllerMixin]
        }
    }

    render() {
        
        return (
            <div className="hero_main_body">
               <Carousel>
                    {/* <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1"/>
                    <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2"/> */}
                </Carousel>
            </div>
        )
    }
}



export default Hero
