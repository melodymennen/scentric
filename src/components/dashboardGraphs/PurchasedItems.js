import React, { Component } from 'react'
import _ from 'lodash'
import {HorizontalBar} from 'react-chartjs-2'
import axios from 'axios'


class PurchasedItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageURL: [],
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
            let sold = new Set(response.data.map(e => e.name))
            let newArr = [...sold]
            let finalObj = []
            newArr.forEach(i => {
                    let amount = 0
                    response.data.forEach( q => {
                        if(q.name === i){
                        amount += q.qty
                        }
                    })
                    finalObj.push({y:i, x: amount})
                })
                        this.setState({
                            ...this.state, data2: {...this.state.data2, labels: newArr.splice(0,9) , datasets: [{...this.state.data2.datasets[0], data: finalObj.splice(0,9)}]},
                        })
                        let pic = []
                        this.state.data2.labels.forEach( j => {
                            response.data.forEach(e => {
                                if(e.name === j){
                                    pic.push(e.image_url)
                                }
                            })
                            this.setState({
                                imageURL: _.uniq(pic)
                            })
                    })
                })

    }


    render() {
        console.log(this.state.imageURL)
        return (
            <div className="products_best_flex">
                <div className="graph_wrapper">
                    <HorizontalBar
                        data={this.state.data2} 
                        width={680}
                        height={360}
                        options={{
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
                <div className="product_best_pictures">
                    <div className="product_pictures">Top Products Sold</div>
                    <img src={this.state.imageURL[1]} alt="product" width="130px"/>
                    <img src={this.state.imageURL[0]} alt="product" width="130px"/>
                    <img src={this.state.imageURL[2]} alt="product" width="130px"/>
                </div>
            </div>
        )
    }
}


export default PurchasedItems
