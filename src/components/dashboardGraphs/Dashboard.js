import React, { Component } from 'react'
import axios from 'axios'
import LineGraph from './LineGraph'
import BarChartSalesPerWeek from './BarChartSalesPerWeek';
import CartGraph from './CartGraph'
import OrdersByDate from './OrdersByDate'
import LineSalesByDay from './LineSalesByDay';
import PurchasedItems from './PurchasedItems'

var today = new Date().toDateString()
        var curr = new Date()
        var first = curr.getDate() - curr.getDay()
        var one = new Date(curr.setDate(first - 1)).toDateString()
        var two = new Date(curr.setDate(first - 2)).toDateString()
        var three = new Date(curr.setDate(first - 3)).toDateString()
        var four = new Date(curr.setDate(first - 4)).toDateString()
        var five = new Date(curr.setDate(first - 5)).toDateString()
        var six = new Date(curr.setDate(first - 6)).toDateString()
        var seven = new Date(curr.setDate(first)).toDateString()

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todayOrders: 0,
            orders: [],
            ordersWeek: 0,
            subtotals: 0,
            weekSubtotals: 0
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
            this.getSalesToday()
            this.getSalesWeek()
        })
    }

    
    getOrdersToday(){
            var count = 0
            this.state.orders.forEach(e => {
                if(e.order_date === today){
                count ++
                }
            })
            this.setState({
                todayOrders: count
        })
    }

    getOrdersWeek(){
        var countTo = 0
            this.state.orders.forEach(e => {
            if(e.order_date === one || two || three || four || five || six || seven){
            countTo ++
                }
            })
            this.setState({
                ordersWeek: countTo
            })
         }

    getSalesToday(){
        var subtotal = 0
            for( let i=0; i< this.state.orders.length; i++){
                this.state.orders[i].order_subtotal = +this.state.orders[i].order_subtotal
                }
                var today = new Date().toDateString()
                this.state.orders.forEach(e => {
                    if(e.order_date === today){
                    subtotal += e.order_subtotal
                    }
                })
                this.setState({
                    subtotals: subtotal
                })
            }

    getSalesWeek(){
        var weekTotals = 0
        for( let i=0; i< this.state.orders.length; i++){
            this.state.orders[i].order_subtotal = +this.state.orders[i].order_subtotal
        }
        this.state.orders.forEach(e => {
            if(e.order_date === one || two || three || four || five || six || seven){
            weekTotals += e.order_subtotal
                }
            })
            this.setState({
                weekSubtotals: weekTotals
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
                                <div>
                                    <div>
                                        <div>Today's Sales</div>
                                        <div>$ {this.state.subtotals.toFixed(2)}</div>
                                    </div>
                                    <div>
                                        <div>Sales This Week</div>
                                        <div>$ {this.state.weekSubtotals.toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className="overview_main_body">
                        <div className="dashboard_title">Top Selling Products</div>
                        <div className="order_flex">
                            <div>
                                <PurchasedItems/>
                            </div>
                        </div>
                    </div>
                    <div className="overview_main_body">
                        <div className="dashboard_title">Most Popular Items in Cart</div>
                        <div>
                            <div>
                                <CartGraph/>
                            </div>
                        </div>
                    </div>
            </div>
            )
        }
        }



export default Dashboard
