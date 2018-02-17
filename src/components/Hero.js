import React, { Component } from 'react'



class Hero extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        
        return (
            <div className="hero_main_body">
                <div className="hero_first_slider"><img src="https://s3-us-west-1.amazonaws.com/scentric/womensperfume.png" alt="hero" width="1000px"/></div>
                <div className="hero_second_slider"><img src="https://s3-us-west-1.amazonaws.com/scentric/colognehero.png" alt="hero" width="1000px"/></div>
            </div>
        )
    }
}



export default Hero
