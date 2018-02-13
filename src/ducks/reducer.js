import axios from 'axios';

const initialState = {
    user: null,
    products: []
}
 
const ACTION = 'ACTION';
const GETPRODUCTS = 'GETPRODUCTS';
 
export function Action (Payload){
    return {
        type: ACTION,
        payload: Payload
    }
}

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
 
export default (state = initialState, action) => {
    switch (action.type){
        case ACTION:
            return {...state, user: action.payload}
        
        case GETPRODUCTS + "_FULFILLED":
             return {...state, products: action.payload}

        default: 
            return state
    }
}