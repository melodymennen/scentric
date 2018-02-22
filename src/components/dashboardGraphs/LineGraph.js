import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'
import _ from 'lodash'
import axios from 'axios'

class LineGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // date: [],
            data1: {
                labels: [],
                datasets: [
                  {
                    label: 'Orders Over Time',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
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
            console.log(response.data)
            var dateArray = []
            var uniqueArray = []
            response.data.forEach( e => {
                dateArray.push(e.order_date)
                uniqueArray = _.uniq(dateArray)
            })
            var countingArray = []
            uniqueArray.forEach( e => {
                console.log('unique', uniqueArray)
                var dupCount = 0
                response.data.forEach ( i => {
                    console.log('data',response.data)
                if(i.order_date === e){
                dupCount ++
                }
                })
                console.log('counting array why you no work', countingArray.push(dupCount))
                this.state.data1.datasets[0].data.push(dupCount)
                })  
                this.setState( prevState => ({
                    data1: {
                        ...prevState.data1,
                        labels: uniqueArray,
                    }
                }))
            })
        }
    

    render() {
        console.log(this.state.data1.datasets[0].data)
        return (
            <div>
                 <Line data={this.state.data1} />
            </div>
        )
    }
}



export default LineGraph
