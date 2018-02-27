import React, { Component } from 'react'
import axios from 'axios'
import LineGraph from './LineGraph'
import BarChartSalesPerWeek from './BarChartSalesPerWeek';
import CartGraph from './CartGraph'
import OrdersByDate from './OrdersByDate'
import LineSalesByDay from './LineSalesByDay';
import PurchasedItems from './PurchasedItems'


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todayOrders: 0,
            orders: [],
            ordersWeek: 0
        }
    }

    componentDidMount(){
        this.getOrders()
    }

    getOrders(){
        axios.get('/api/ordersall').then( response => {
            this.setState({
                orders: response.data
            })
            this.getOrdersToday()
            this.getOrdersWeek()
        })
    }


    getOrdersToday(){
            var count = 0
            var today = new Date().toDateString()
            this.state.orders.map(e => {
                if(e.order_date === today){
                count ++
                }
            })
            this.setState({
                todayOrders: count
        })
    }

    getOrdersWeek(){
        var curr = new Date
        var first = curr.getDate() - curr.getDay()
        var one = new Date(curr.setDate(first - 1)).toDateString()
        var two = new Date(curr.setDate(first - 2)).toDateString()
        var three = new Date(curr.setDate(first - 3)).toDateString()
        var four = new Date(curr.setDate(first - 4)).toDateString()
        var five = new Date(curr.setDate(first - 5)).toDateString()
        var six = new Date(curr.setDate(first - 6)).toDateString()
        var seven = new Date(curr.setDate(first)).toDateString()
        var countTo = 0
            this.state.orders.map(e => {
            if(e.order_date === one || two || three || four || five || six || seven){
            countTo ++
                }
            })
            this.setState({
                ordersWeek: countTo
            })
         }
    

    render() {
        return (
            <div>
                <div className="overview_main_body">
                    <div className="dashboard_title">Orders</div>
                        <div className="order_flex">
                            <div>
                                <LineGraph/>
                                <OrdersByDate/>
                            </div>
                            <div>
                                <div>
                                    <div>Today's Orders</div>
                                    <div>{this.state.todayOrders}</div>
                                </div>
                                <div>
                                    <div>Orders This Week</div>
                                    <div>{this.state.ordersWeek}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overview_main_body">
                        <div className="dashboard_title">Sales by Day of Week</div>
                            <div className="order_flex">
                                <div>
                                    <LineSalesByDay/>
                                    <BarChartSalesPerWeek/>
                                </div>
                                {/* <div>
                                    <div>
                                        <div>Today's Orders</div>
                                        <div>{this.state.todayOrders}</div>
                                    </div>
                                    <div>
                                        <div>Orders This Week</div>
                                        <div>{this.state.ordersWeek}</div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    <div className="overview_main_body">
                        <div className="dashboard_title">Products</div>
                        <div className="order_flex">
                            <div>
                                <PurchasedItems/>
                                <CartGraph/>
                            </div>
                            {/* <div>
                                <div>
                                    <div>Today's Orders</div>
                                    <div>{this.state.todayOrders}</div>
                                </div>
                                <div>
                                    <div>Orders This Week</div>
                                    <div>{this.state.ordersWeek}</div>
                                </div>
                            </div> */}
                        </div>
                    </div>
            </div>
            )
        }
        }



export default Dashboard
