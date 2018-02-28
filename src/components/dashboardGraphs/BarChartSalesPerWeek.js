import React, { Component } from 'react'
import axios from 'axios'
import {Bar} from 'react-chartjs-2'
import _ from 'lodash'


class BarChartSalesPerWeek extends Component {
    constructor(props) {
        super(props)
        console.log('props', props)
        this.state = {
            data3: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [
                  {
                    label: 'Sales',
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,0.4)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                    hoverBorderColor: 'rgba(75,192,192,0.4)',
                    data: []
                  }
                ]
              }
        }
    }

    componentDidMount() {
        this.getAllOrders()
    }

    getAllOrders(){
        axios.get('/api/ordersall').then( response => {
            var mon = []
            var tues = []
            var wed = []
            var thurs = []
            var fri = []
            var sat = []
            var sun = []
            response.data.forEach(e => {
                if( e.order_date.split(' ')[0] === 'Mon'){
                    mon.push(+e.order_subtotal)
                }if(e.order_date.split(' ')[0] === 'Tue'){
                    tues.push(+e.order_subtotal)
                }if(e.order_date.split(' ')[0] === 'Wed'){
                    wed.push(+e.order_subtotal)
                }if( e.order_date.split(' ')[0] === 'Thu'){
                    thurs.push(+e.order_subtotal)
                }if( e.order_date.split(' ')[0] === 'Fri'){
                    fri.push(+e.order_subtotal)
                }if( e.order_date.split(' ')[0] === 'Sat'){
                    sat.push(+e.order_subtotal)
                }else if( e.order_date.split(' ')[0] === 'Sun'){
                    sun.push(+e.order_subtotal)
                }
            })
            
                var dataFinal = [_.sum(mon).toFixed(2), _.sum(tues).toFixed(2), _.sum(wed).toFixed(2), _.sum(thurs).toFixed(2), _.sum(fri).toFixed(2), _.sum(sat).toFixed(2), _.sum(sun).toFixed(2)]

                this.setState({
                    ...this.state, data3: {...this.state.data3, datasets: [{...this.state.data3.datasets[0], data: dataFinal}]}
                })
            }
        )}

    render() {
        return (
            <div className="graph_wrapper">
                <Bar
                    data={this.state.data3}
                    width={100}
                    height={50}
                    options={{
                        scales:{
                        yAxes:[{
                            ticks:{
                                callback: function(value, index, values) {
                                    return '$' + value;
                            }
                        }
                        }],
                        xAxes:[{
                            ticks:{
                                beginAtZero:true,
                                suggestedMin: 0,
                            },
                        }]
                    }
                }}
                />
            </div>
        )
    }
}


export default BarChartSalesPerWeek
