import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import DisplayProducts from './components/DisplayProducts'
import OrderConfirmation from './components/OrderConfirmation'
import EditProduct from './components/EditProduct'
import ProductPage from './components/ProductPage'
import NewArrivals from './components/NewArrivals'
import ContactUs from './components/ContactUs'
import Checkout from './components/Checkout'
import Account from './components/Account'
import Admin from './components/Admin'
import Sale from './components/Sale'
import Home from './components/Home'
import Cart from './components/Cart'
import FAQ from './components/FAQ'


export default (
    <Switch>
        <Route exact path="/" component = { LandingPage } />
        <Route path="/Home" component = { Home } />
        <Route path="/OrderConfirmation/:order_id" component = { OrderConfirmation } />
        <Route path="/display/:category" component = { DisplayProducts } />
        <Route path="/products/:product_id" component = { ProductPage } />
        <Route path="/NewArrivals" component = { NewArrivals} />
        <Route path="/Admin/:id" component = { EditProduct } />
        <Route path="/ContactUs" component = { ContactUs } />
        <Route path="/Checkout" component = { Checkout } />
        <Route exact path="/Admin" component = { Admin } />
        <Route path="/Account" component = { Account } />
        <Route path="/Sale" component = { Sale } />
        <Route path="/Cart" component = { Cart } />
        <Route path="/FAQ" component = { FAQ } />
    </Switch>
)