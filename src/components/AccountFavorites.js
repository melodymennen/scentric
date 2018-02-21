import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Favorites extends Component {
    constructor() {
        super()

        this.state = {
            favorites: []
        }

        this.getFavorites = this.getFavorites.bind(this)
    }

    componentDidMount() {
        this.getFavorites()
    }

    getFavorites() {
        axios.get("/api/favorites").then(response => {
            this.setState({ favorites: response.data })
        })
    }

    removeFavorite(value) {
        axios.delete(`/api/favorites/${value}`).then(() => {
            console.log('item removed from favorites')
            this.getFavorites()
        })
    }

    render() {
        const favorites = this.state.favorites.map(item => {
            return (
                <div key={item.id} className="favorites_line-item" >
                    <div className="favorites_image"><Link to={`/products/${item.product_id}`}><img src={item.image_url} alt={item.name} /></Link></div>
                    <div className="favorites_name"><Link to={`/products/${item.product_id}`}> {item.name} </Link></div>
                    <div className="favorites_price">${item.price}</div>
                    <div className="favorites_remove"><button onClick={() => this.removeFavorite(item.product_id)}>remove</button> </div>
                </div>
            )
        })

        return (
            <div className='account_container account_show-favorites'>
                <div className="account_favorites-excerpt">
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
                </div>
            </div>
        )
    }
}

export default Favorites