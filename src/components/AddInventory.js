import React, { Component } from 'react'
import axios from 'axios'


class Inventory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            image_url: '',
            price: '',
            selectCategory: '',
            selectScentFamily: '',
        }
        this.addProduct=this.addProduct.bind(this)
    }

    handleTitleChange(value){
        console.log(value)
        this.setState({
            name: value
        })
    }
    handleDescriptionChange(value){
        console.log(value)
        this.setState({
            description: value
        })
    }
    handleImageChange(value){
        console.log(value)
        this.setState({
            image_url: value
        })
    }
    handlePriceChange(value){
        console.log(value)
        this.setState({
            price: value
        })
    }
    handleCategoryChange(value){
        console.log(value)
        this.setState({
            category: value
        })
    }
    handleScentFamilyChange(value){
        console.log(value)
        this.setState({
            scent_family: value
        })
    }

    addProduct(){
        const body = {
            name: this.state.name,
            description: this.state.description,
            image_url: this.state.image_url,
            price: this.state.price,
            category: this.state.category,
            scent_family: this.state.scent_family
        }
        axios.post('/api/product', body).then(() => {
            this.setState({
                name: '',
                description: '',
                image_url: '',
                price: '',
                category: '',
                scent_family: ''
            })
        })
    }

    render() {
        return (
            <div>
                <div className="inventory_admin_panel_title">Add Inventory</div>
                <div className="inventory_admin_panel">
                    <div><input value={this.state.name} placeholder="Title" onChange={(e)=>this.handleTitleChange(e.target.value)}/></div>
                    <div><textarea value={this.state.description} placeholder="Description" onChange={(e)=>this.handleDescriptionChange(e.target.value)}/></div>
                    <div><input value={this.state.price} placeholder="Price" onChange={(e)=>this.handlePriceChange(e.target.value)}/></div>
                    <div><input value={this.state.image_url} placeholder="Image" onChange={(e)=>this.handleImageChange(e.target.value)}/></div>
                    <div><select value={this.state.category} onChange={(e)=>this.handleCategoryChange(e.target.value)}>
                        <option>Category</option>
                        <option value="perfume">Perfume</option>
                        <option value="cologne">Cologne</option>
                    </select>
                    </div>
                    <div>
                    {this.state.category === 'perfume' &&
                        <select value={this.state.scent_family} onChange={(e)=>this.handleScentFamilyChange(e.target.value)}>
                            <option>Scent Family</option>
                            <option value="floral">Floral</option>
                            <option value="oceanic">Oceanic</option>
                            <option value="citrus">Citrus</option>
                            <option value="green">Green</option>
                            <option value="gourmand">Gourmand</option>
                        </select>}
                    {this.state.category === 'cologne' &&
                        <select value={this.state.scent_family}  onChange={(e)=>this.handleScentFamilyChange(e.target.value)}>
                            <option>Scent Family</option>
                            <option value="woody">Woody</option>
                            <option value="spicy">Spicy</option>
                            <option value="musk">Musk</option>
                            <option value="fresh">Fresh</option>
                            <option value="earthy">Earthy</option>
                        </select>
                    }
                    </div>
                    <div><button onClick={this.addProduct}className="button">Add Product</button></div>
                </div>
            </div>
        )
    }
}


export default Inventory
