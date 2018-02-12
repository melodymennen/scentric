// import axios from 'axios';

const initialState = {
    user: null 
}
 
const ACTION = 'ACTION';
 
export function Action (Payload){
    return {
        type: ACTION,
        payload: Payload
    }
}
 
export default (state = initialState, action) => {
    switch (action.type){
        case ACTION:
            return {...state, user: action.payload}
        default: 
            return state
    }
}