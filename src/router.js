import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import LandingPage from './components/LandingPage'
import DisplayProducts from './components/DisplayProducts'
import ProductPage from './components/ProductPage'
import Checkout from './components/Checkout'
import Cart from './components/Cart'
import Login from './components/Login'
import FAQ from './components/FAQ'


export default (
    <Switch>
        <Route exact path="/" component = { LandingPage } />
        <Route path="/Home" component = { Home } />
        <Route path="/display/:category" component = { DisplayProducts } />
        <Route path="/products/:product_id" component = { ProductPage } />
        <Route path="/Checkout" component = { Checkout } />
        <Route path="/Cart" component = { Cart } />
        <Route path="/Login" component = { Login } />
        <Route path="/FAQ" component = { FAQ } />
    </Switch>
)