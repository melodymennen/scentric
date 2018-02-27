import React, { Component } from 'react'
import axios from 'axios'
import {Bar} from 'react-chartjs-2'


class OrdersByDate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data2: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [
                    {   label: [ 'Orders'],
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: []
                    },
                    
                ],
            },
        }
    }

    componentDidMount(){
        this.getOrders()
    }

    getOrders(){
        axios.get('/api/ordersall').then( response => {
            var mon = 0 
            var tue = 0
            var wed = 0
            var thur = 0
            var fri = 0
            var sat = 0
            var sun = 0
            var counting = []
        response.data.map(e => {
            if( e.order_date.split(' ')[0] === 'Mon'){
                    mon++
                }if(e.order_date.split(' ')[0] === 'Tue'){
                    tue++
                }if(e.order_date.split(' ')[0] === 'Wed'){
                    wed++
                }if( e.order_date.split(' ')[0] === 'Thu'){
                    thur++
                }if( e.order_date.split(' ')[0] === 'Fri'){
                    fri++
                }if( e.order_date.split(' ')[0] === 'Sat'){
                    sat++
                }else if( e.order_date.split(' ')[0] === 'Sun'){
                    sun++
                }
            })          
            console.log([mon,tue,wed,thur,fri,sat,sun])
            this.state.data2.datasets[0].data = [mon,tue,wed,thur,fri,sat,sun]
        })
            this.setState({
                data2: this.state.data2
            })
    }

    render() {
        return (
            <div className="graph_wrapper">
                <Bar
                    data={this.state.data2}
                    width={600}
                    height={280}
                    options={{
                        title: {
                            display: true,
                            text: 'Orders By Day of the Week',
                        },
                        scales:{
                            yAxes:[{
                                ticks:{
                                    beginAtZero:true,
                                    suggestedMin: 0,
                                    suggestedMax: 10,
                                },
                            }]
                        }
                    }}/>
            </div>
        )
    }
}



export default OrdersByDate
