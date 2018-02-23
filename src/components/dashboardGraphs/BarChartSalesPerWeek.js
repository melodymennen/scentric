import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'



const data = [
{ order_subtotal: 99.97, order_date: 'Tue Feb 20 2018' },
  { order_subtotal: 98.99, order_date: 'Tue Feb 20 2018' },
  { order_subtotal: 49.91, order_date: 'Tue Feb 21 2018' },
  { order_subtotal: 98.99, order_date: 'Tue Feb 22 2018' },
  { order_subtotal: 54.98, order_date: 'Tue Feb 23 2018' }
]

class BarChartSalesPerWeek extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    getAllOrders(){
        axios.get('/api/ordersall').then( response => {
            
           
            }
        )}

    render() {
        return (
            <div>
               <VictoryChart domainPadding={20}>
                    <VictoryAxis
                    // tickValues specifies both the number of ticks and where
                    // they are placed on the axis
                        // tickValues={[1, 2, 3, 4, 5, 6, 7]}
                        // tickFormat={["Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday","Sunday"]}
                        style={{tickLabels: {fontSize: 7, padding: 3}}}
                    />
                    <VictoryAxis
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        // tickFormat={(x) => (`$${x}`)}
                        tickFormat={(x) => (`$${x}`)}
                    />
        <VictoryBar
          data={data}
          x="order_date"
          y="order_subtotal"
        />
      </VictoryChart>
            </div>
        )
    }
}


export default BarChartSalesPerWeek
