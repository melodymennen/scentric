import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Favorites extends Component {
    constructor(){
        super()

        this.state = {
            favorites: []
        }

        this.getFavorites = this.getFavorites.bind(this)
    }

    componentDidMount(){
        this.getFavorites()
        console.log(this.state.favorites)
    }

    getFavorites(){
        axios.get("/api/favorites").then(response => {
            this.setState({favorites: response.data})
            console.log(this.state.favorites)
        })
    }

    render() {
        const favorites = this.state.favorites.map( item => {
            return (
                <div key={item.id} className="favorites_line-item" >
                    <div className="favorites_image"><Link to={`/products/${item.product_id}`}><img src={item.image_url} alt={item.name}/></Link></div>
                    <div className="favorites_name"><Link to={`/products/${item.product_id}`}> {item.name} </Link></div>
                    <div className="favorites_price">${item.price}</div>
                </div>
            )
        })

        return (
            <div>
                <div className="favorites_body">
                    <div className="favorites_title">Favorites</div>
                    {this.state.favorites && 
                        favorites
                    }
                    {this.state.favorites.length === 0 && 
                        <div className="cart-no-items">There are no favorites to display.</div>
                    }
                </div>
            </div>
        )
    }
}

export default Favorites