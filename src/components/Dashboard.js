import React, { Component } from 'react'
import LineGraph from './dashboardGraphs/LineGraph'
import BarChartSalesPerWeek from './dashboardGraphs/BarChartSalesPerWeek';
import CartGraph from './dashboardGraphs/CartGraph'


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
                <CartGraph/>
            </div>
        )
    }
}



export default Dashboard
