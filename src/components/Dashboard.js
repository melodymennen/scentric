import React, { Component } from 'react'
import LineGraph from './dashboardGraphs/LineGraph'



class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    

    render() {
        return (
            <div>
                <LineGraph/>
            </div>
        )
    }
}



export default Dashboard
