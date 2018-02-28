import React, { Component } from 'react'
import FileUpload from './FileUpload'
import request from 'superagent'
import axios from 'axios'


class Inventory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            on_sale: false,
            name: '',
            description: '',
            image_url: '',
            price: '',
            selectCategory: '',
            selectScentFamily: '',
        }
        this.addProduct=this.addProduct.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.onSale = this.onSale.bind(this)
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
 
    handlePriceChange(value){
        console.log(value)
        this.setState({
            price: value
        })
    }

    onSale(){
        this.setState({
            on_sale: !this.state.on_sale
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
            scent_family: this.state.scent_family,
            on_sale: this.state.on_sale
        }
        axios.post('/api/product', body).then(() => {
            this.setState({
                name: '',
                description: '',
                image_url: '',
                price: '',
                category: '',
                scent_family: '',
                on_sale: ''
            })
        })
    }

    onDrop = (files) => {
        request
        .post('/upload')
        .attach('image_url', files[0])
        .end((error, response) => {
            if (error) {
                console.log('on drop error',error)
                alert('File Not Uploaded')
            } else {
                alert('File Uploaded Succesfully')
                console.log('File Uploaded Succesfully')
                console.log(response.text)
                this.setState({ image_url: response.text})
            }
        })
    }

    render() {
        return (
            <div className="admin_flex_two">
                <div className="inventory_admin_panel_title">Add Inventory</div>
                    <div className="inventory_admin_panel">
                        <div>
                            <input value={this.state.name} placeholder="Title" onChange={(e)=>this.handleTitleChange(e.target.value)}/>
                        </div>
                        <div>
                            <textarea value={this.state.description} placeholder="Description" onChange={(e)=>this.handleDescriptionChange(e.target.value)}/>
                        </div>
                        {this.state.image_url ? 
                            <div className="drop_zone_wrapper"><img src={this.state.image_url} alt="product" width="100px"/></div> 
                            : <FileUpload onDrop={this.onDrop} />}
                        <div>
                            <input value={this.state.price} placeholder="Price" onChange={(e)=>this.handlePriceChange(e.target.value)}/>
                            <div onClick={this.onSale} className={this.state.on_sale === true ? "onSale" : "notOnSale"}>Sale</div>
                        </div>
                        <div>
                            <select value={this.state.category} onChange={(e)=>this.handleCategoryChange(e.target.value)}>
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
