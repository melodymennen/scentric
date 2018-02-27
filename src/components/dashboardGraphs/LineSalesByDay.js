import React, { Component } from 'react'
import axios from 'axios'
import {Line} from 'react-chartjs-2'


class LineSalesByDay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            final: [],
            data1: {
                labels: [],
                datasets: [
                  {
                    label: 'Sales',
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
        this.getOrders()
    }

    getOrders(){
        axios.get('/api/ordersall').then( response => {
            for( let i=0; i< response.data.length; i++){
                response.data[i].order_subtotal = +response.data[i].order_subtotal
              }
              let unique = [...new Set(response.data.map(date => date.order_date))]
                let arr = [...unique].map( e => {
                  let total = 0
                  this.state.final = []
                  response.data.forEach( p => {
                    if(p.order_date === e){
                      total += p.order_subtotal
                    }
                  })
                    this.state.data1.datasets[0].data.push({x: e, y: total.toFixed(2) })
                    this.state.data1.labels = (this.state.data1.datasets[0].data.map(e => e.x))
              })
              this.setState({
                  data1: this.state.data1
              })
        })
    }


    render() {
        return (
            <div className="graph_wrapper">
                 <Line data={this.state.data1}
                 width={650}
                 height={300} 
                 options={{
                    title: {
                        display: true,
                        text: 'Sales over Time',
                    },
                    xAxes:[{
                        ticks:{
                            beginAtZero:true,
                            suggestedMin: 0,
                        },
                    }]
                }}/>
            </div>
        )
    }
}



export default LineSalesByDay
