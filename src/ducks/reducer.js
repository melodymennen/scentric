import axios from 'axios';

const initialState = {
    user: null,
    products: [],
    cart: []
}
 
const GETPRODUCTS = 'GETPRODUCTS';
const GETCART = "GETCART";
const LOGIN = 'LOGIN';
 

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

export const getCart = () => {
    var request = axios.get('/api/cart').then( response => {
        if(response.data) {
            return response.data
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

        case GETCART + "_FULFILLED":
            return {...state, cart: action.payload}

        case LOGIN:
            return {...state, user: action.payload};

        default: 
            return state
    }
}