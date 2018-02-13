import { createStore, applyMiddleware } from 'redux'
import reducer from './ducks/reducer'
import reduxPromiseMiddleware from 'redux-promise-middleware';

export default createStore(reducer, applyMiddleware(reduxPromiseMiddleware()))