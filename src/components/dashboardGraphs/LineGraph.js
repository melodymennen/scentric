import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'
import _ from 'lodash'
import axios from 'axios'

class LineGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // date: [],
            data: {
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
                    data: [2, 5, 6]
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
            for(let i = 0; i < response.data.length; i++){
                dateArray.push(response.data[i].order_date)
                }
                this.setState( prevState => ({
                    data: {
                        ...prevState.data,
                        labels: _.uniq(dateArray)
                    }
                }))
            })
        }
    

    render() {
        console.log(this.state.data)
        return (
            <div>
                 <Line data={this.state.data} />
            </div>
        )
    }
}



export default LineGraph
