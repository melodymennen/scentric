import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import DisplayProducts from './components/DisplayProducts'
import OrderConfirmation from './components/OrderConfirmation'
import ProductPage from './components/ProductPage'
import ContactUs from './components/ContactUs'
import Checkout from './components/Checkout'
import Account from './components/Account'
import Admin from './components/Admin'
import Home from './components/Home'
import Cart from './components/Cart'
import FAQ from './components/FAQ'
import EditProduct from './components/EditProduct'
import NewArrivals from './components/NewArrivals'
import Sale from './components/Sale'


export default (
    <Switch>
        <Route exact path="/" component = { LandingPage } />
        <Route path="/Home" component = { Home } />
        <Route path="/OrderConfirmation/:order_id" component = { OrderConfirmation } />
        <Route path="/display/:category" component = { DisplayProducts } />
        <Route path="/products/:product_id" component = { ProductPage } />
        <Route path="/ContactUs" component = { ContactUs } />
        <Route path="/NewArrivals" component = { NewArrivals} />
        <Route path="/Sale" component = { Sale } />
        <Route path="/Checkout" component = { Checkout } />
        <Route path="/Account" component = { Account } />
        <Route exact path="/Admin" component = { Admin } />
        <Route path="/Cart" component = { Cart } />
        <Route path="/FAQ" component = { FAQ } />
        <Route path="/Admin/:id" component = { EditProduct } />
    </Switch>
)