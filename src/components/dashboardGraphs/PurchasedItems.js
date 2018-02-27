import React, { Component } from 'react'
import {HorizontalBar} from 'react-chartjs-2'
import axios from 'axios'


class PurchasedItems extends Component {
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
        this.getProducts()
    }

    getProducts(){
        axios.get('/api/productssold').then( response => {
            let sold = new Set(response.data.splice(0,9).map(e => e.name))
            let newArr = [...sold]
            let label = []
            let finalObj = []
            newArr.map(i => {
                    let amount = 0
                    response.data.forEach( q => {
                        if(q.name === i){
                        amount += q.qty
                        }
                    })
                    finalObj.push({y:i, x: amount})
                })
                        this.setState({
                            ...this.state, data2: {...this.state.data2, labels: newArr, datasets: [{...this.state.data2.datasets[0], data: finalObj}]},
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
                            text: 'Best Sellers',
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


export default PurchasedItems
