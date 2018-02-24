import React, { Component } from 'react'
import axios from 'axios'
import {Bar} from 'react-chartjs-2'


class CartGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data2: {
                labels: [ 'Sex Panther', 'b-nasty', 'eau de trevor' ],
                datasets: [
                    {   label: [ 'product'],
                        backgroundColor: ['rgba(75,192,192,0.4)', 'rgba(75,192,192,0.4)','rgba(75,192,192,0.4)','rgba(75,192,192,0.4)'],
                        borderWidth: 1,
                        hoverBackgroundColor: ['rgba(75,192,192,0.4)'],
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [ 2, 1, 1 ]
                    },
                    
                ],
            },
        }

    }

    componentDidMount() {
        this.getCartAll()
    }

    getCartAll(){
        axios.get('/api/cart/all').then(response => {
              
            })
        }

    render() {
        return (
            <div>
                <Bar 
                    data={this.state.data2} 
                    options={{
                        title: {
                            display: true,
                            text: 'Most Popular Items in Cart',
                            fontColor: 'black'
                        },
                        legend: {
                            display: false,
                        },
                         maintainAspectRatio: true,
                         scales:{
                            yAxes:[{
                                ticks:{
                                    beginAtZero:true,
                                },
                            }]
                        }
                    }}
                    />
            </div>
        )
    }
}



export default CartGraph
