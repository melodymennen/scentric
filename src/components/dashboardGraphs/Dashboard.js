import React, { Component } from 'react'
import LineGraph from './LineGraph'
import BarChartSalesPerWeek from './BarChartSalesPerWeek';
import CartGraph from './CartGraph'
import OrdersByDate from './OrdersByDate'


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
                        <div className="order_flex">
                            <div>
                                <LineGraph/>
                                <OrdersByDate/>
                            </div>
                            <div className="admin_home_first_body">
                                <div>Today's Orders</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="line_graph_body_main">
                    <div className="admin_overview">Orders by Day of Week</div>
                    <div className="line_graph_inner_wrapper">
                        <OrdersByDate/>
                    </div>
                </div>
                <div className="line_graph_body_main">
                    <div className="admin_overview">Sales by Day of Week</div>
                    <div className="line_graph_inner_wrapper">
                        <BarChartSalesPerWeek/>
                    </div>
                </div>
                <div className="line_graph_body_main">
                    <div className="admin_overview">Most Popular Products in Cart</div>
                    <div className="line_graph_inner_wrapper">
                        <CartGraph/>
                    </div>
                </div>
                
            </div>
        )
    }
}



export default Dashboard
