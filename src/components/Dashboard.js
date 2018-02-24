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
                <div className="line_graph_body_main">
                    <div className="admin_overview">Orders By Date</div>
                    <div className="line_graph_inner_wrapper">
                            <LineGraph/>
                        </div>
                </div>
                <BarChartSalesPerWeek/>
                <CartGraph/>
            </div>
        )
    }
}



export default Dashboard
