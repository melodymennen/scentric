const axios = require('axios')
const _ = require('lodash')

module.exports = {
    generateId: () => {
        // localStorage.removeItem("generatedId")
        if(localStorage.getItem("generatedId")){
            axios.post('/api/generatedId', {generatedId: localStorage.getItem("generatedId")})
        } else {
            var generatedId = Math.floor((Math.random() * 100000) + 1) + Math.floor((Math.random() * 100000) + 1)
            localStorage.setItem('generatedId', generatedId)
            axios.post('/api/generatedId', {generateId: localStorage.getItem("generatedId")})
        }
    }, 
    isEmail: (input) => {
        if(input.includes('@') && input.includes('.')){
            return true
        } else {
            return false
        }
    },
    getCart: (response) => {
        var prices = []
        var qty = []
        if(response.data) {
            for(let i=0 ; i < response.data.length ; i++) {
                prices.push(+(response.data[i].price*response.data[i].qty))
            }
            for( let i=0; i < response.data.length; i++){
                qty.push(+(response.data[i].qty))
            }
            return {
                cart: response.data, 
                subtotal: _.sum(prices), 
                qty: _.sum(qty)
            }
        }
    }
}