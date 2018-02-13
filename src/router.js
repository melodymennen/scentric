import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import LandingPage from './components/LandingPage'
import DisplayProducts from './components/Header'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductPage from './components/ProductPage'
import Checkout from './components/Checkout'
import Cart from './components/Cart'


export default (
    <Switch>
        <Route exact path="/header" component = { LandingPage } />
        <Route path="/Home" component = { Home } />
        <Route path="/Display/:category" component = { DisplayProducts } />
        <Route exact path="/" component = { Header } />
        <Route path="/Footer" component = { Footer } />
        <Route path="/ProductPage" component = { ProductPage } />
        <Route path="/Checkout" component = { Checkout } />
        <Route path="/Cart" component = { Cart } />
    </Switch>
)