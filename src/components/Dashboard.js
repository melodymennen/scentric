import React, { Component } from 'react'
import LineGraph from './dashboardGraphs/LineGraph'
import BarChartSalesPerWeek from './dashboardGraphs/BarChartSalesPerWeek';


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
                <BarChartSalesPerWeek/>
            </div>
        )
    }
}



export default Dashboard
