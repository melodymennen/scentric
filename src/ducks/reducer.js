import axios from 'axios'
import _ from 'lodash'

const initialState = {
    user: null,
    products: [],
    cart: {
        cart:[], 
        subtotal: 0,
        qty: 0
    }
}
 
const GETPRODUCTS = 'GETPRODUCTS'
const GETCART = "GETCART"
const GETUSER = 'GETUSER'
const LOGIN = 'LOGIN'
 

export const getProducts = () => {
    var request = axios.get('/api/products').then( response => {
        if (response.data) {
            return response.data
        }
    })
    return {
        type: GETPRODUCTS,
        payload: request
    }
}

export const getUser = () => {
    var request = axios.get('/user-data').then(response => {
        if(response.data){
            return(response.data)
        } 
    })
    return {
        type: GETUSER,
        payload: request
    }
}

export const getCart = () => {
    var request = axios.get('/api/cart').then( response => {
        if(response.data) {
            var prices = []
            var qty = []
            for( let i=0 ; i < response.data.length ; i++) {
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
    })
    return {
        type: GETCART,
        payload: request
    }
}

export const login = (user) => {
    return {
        type: LOGIN,
        payload: user,
    }
}
 
export default (state = initialState, action) => {
    switch (action.type){
        case GETPRODUCTS + "_FULFILLED":
             return {...state, products: action.payload}
       
        case GETUSER + "_FULFILLED":
             return {...state, user: action.payload}

        case GETCART + "_FULFILLED":
            return {...state, cart: action.payload}

        case LOGIN:
            return {...state, user: action.payload}

        default: 
            return state
    }
}