import React, { Component } from 'react'
import axios from 'axios'
import {HorizontalBar} from 'react-chartjs-2'


class CartGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data2: {
                labels: [],
                datasets: [
                    {   label: [ 'product'],
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

    componentDidMount() {
        this.getCartAll()
    }

    getCartAll(){
        axios.get('/api/cart/all').then(response => {
                let products = new Set(response.data.map(e => e.name))
                let pro = [...products]
                    pro.forEach( e => {
                    let qty = 0
                        response.data.forEach( el => {
                            if(el.name === e ) {
                            qty += el.qty
                            }
                        })
                this.state.data2.datasets[0].data.push({y: e, x: qty})
                this.state.data2.labels = (this.state.data2.datasets[0].data.map(e => e.y))
            })
            this.setState({
                data2: this.state.data2
            })
            })
        }

    render() {
        return (
            <div className="graph_wrapper">
                <HorizontalBar
                    data={this.state.data2} 
                    width={580}
                    height={280}
                    options={{
                        title: {
                            display: true,
                            text: 'Most Popular Items in Cart',
                            fontColor: 'black'
                        },
                         scales:{
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



export default CartGraph
