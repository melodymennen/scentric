import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../ducks/reducer'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'

import ProductModule from './ProductModule'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    
    componentDidMount() {
        this.props.getProducts()
        this.generateId()
    }

    generateId(){
        var generatedId = Math.floor((Math.random() * 100000000) + 1) 
        console.log(generatedId)
        // localStorage.removeItem("generatedId")
        if(localStorage.getItem("generatedId")){
            axios.post('/api/generatedId', {generatedId: localStorage.getItem("generatedId")})
            console.log(localStorage.getItem("generatedId"))
        } else {
            localStorage.setItem('generatedId', generatedId)
            axios.post('/api/generatedId', {generateId: localStorage.getItem("generatedId")})
            console.log(localStorage.getItem("generatedId"))  
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="home_hero">Lorem ipsum dolor sit amet, consectetur adipisicing elit</div>
                <div className="home_flex">
                {this.props.products.slice(0,6).map(e => {
                    return (
                    <div key={e.id}>
                        <ProductModule
                        name={e.name} 
                        description={e.description}
                        price={e.price}
                        pic={e.image_url}
                        id={e.id}
                        />
                    </div>
                    )
                })}
                </div>
                <Footer />
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        products: state.products
    }
}

const mapDispatchToProps = {
    getProducts: getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
