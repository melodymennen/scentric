import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import DisplayProducts from './components/DisplayProducts'
import ProductPage from './components/ProductPage'
import ContactUs from './components/ContactUs'
import Checkout from './components/Checkout'
import Account from './components/Account'
import Home from './components/Home'
import Cart from './components/Cart'
import FAQ from './components/FAQ'
import Admin from './components/Admin'
// import Inventory from './components/Inventory'



export default (
    <Switch>
        <Route exact path="/" component = { LandingPage } />
        <Route path="/Home" component = { Home } />
        <Route path="/display/:category" component = { DisplayProducts } />
        <Route path="/products/:product_id" component = { ProductPage } />
        <Route path="/Checkout" component = { Checkout } />
        <Route path="/Cart" component = { Cart } />
        <Route path="/Account" component = { Account } />
        <Route path="/FAQ" component = { FAQ } />
        <Route path="/ContactUs" component = { ContactUs } />
        <Route path="/Admin" component = {Admin} />
        {/* <Route path="/Admin/Inventory" component = { Inventory } /> */}
    </Switch>
)