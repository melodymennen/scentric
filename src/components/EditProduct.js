import React, { Component } from 'react'
import axios from 'axios'



class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: [],
            name: '',
            description: '',
            price: '',
            category: '',
            scent_family: '',
            image_url: '',
            on_sale: false
        }
        this.editProduct = this.editProduct.bind(this)
        this.onSale = this.onSale.bind(this)
        this.notOnSale = this.notOnSale.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
    }

    // componentWillReceiveProps(props){
    //     this.getProduct(props.id)
    // }

    componentDidMount(props) {
        this.getProduct(this.props.id)
    }


    getProduct(id){
        axios.get(`/api/admin/${id}`).then(response => {
            const e = response.data[0]
                this.setState({
                    name: e.name,
                    description: e.description,
                    price: e.price,
                    category: e.category,
                    scent_family: e.scent_family,
                    image_url: e.image_url,
                    on_sale: e.on_sale,
                })
            })
    }

    editProduct(){
        console.log('button working?')
        const body = {
            name: this.state.name,
            description: this.state.description,
            image_url: this.state.image_url,
            price: this.state.price,
            category: this.state.category,
            scent_family: this.state.scent_family,
            on_sale: this.state.on_sale
        }
        console.log(body)
        axios.put(`/api/product/${this.props.id}`, body).then(() => {
            this.props.closed()
        }).catch(console.log)
    }

    deleteProduct(){
        axios.delete(`/api/product/${this.props.id}`).then( () => {
            this.props.closed()
        })
    }
    onSale(){
        this.setState({
            on_sale: false
        }, () => console.log(this.state.on_sale))
    }

    notOnSale(){
        this.setState({
            on_sale: true
        }, () => console.log(this.state.on_sale))
    }


    handleNameChange(value){
        console.log(value)
        this.setState({
            name: value
        })
    }
    handleDescriptionChange(value){
        this.setState({
            description: value
        })
    }
    handleCategoryChange(value){
        this.setState({
            category: value
        })
    }
    handlePriceChange(value){
        this.setState({
            price: value
        })
    }
    handleScentFamilyChange(value){
        this.setState({
            scent_family: value
        })
    }

    render() {
        return (
            <div className="edit_products_modal_backdrop">
                <div className="edit_products_modal">
                        <div className="edit_products_name">{this.state.name}</div>
                    <div>
                        <div className="edit_product_flex">
                                <div>
                                    <img src={this.state.image_url} alt="product" width="200px"/>
                                </div>
                                <div>
                                    <div className="modal_title">
                                        <div>Name</div>
                                        <input onChange={(e)=> this.handleNameChange(e.target.value)} value={this.state.name}/>
                                    </div>
                                    <div className="modal_title">
                                        <div>Description</div>
                                        <textarea onChange={(e) => {this.handleDescriptionChange(e.target.value)}}value={this.state.description} resize="none"/>
                                    </div>
                                    <div className="modal_title">
                                        <div>Price</div>
                                        <input onChange={(e) => this.handlePriceChange(e.target.value)} value={this.state.price}/>
                                    </div>
                                    <div className="modal_sale">
                                        <div>Sale:</div>
                                        {this.state.on_sale ? <div onClick={this.onSale} className="edit_onSale">On Sale</div> : <div onClick={this.notOnSale} className="edit_notOnSale">Not On Sale</div>}
                                    </div>
                                    <div className="modal_select">
                                        <select onChange={(e) => this.handleCategoryChange(e.target.value)} value={this.state.category}>
                                            <option value="perfume">Perfume</option>
                                            <option value="cologne">Cologne</option>
                                        </select>
                                        {this.state.category === 'cologne'&& 
                                        <select onChange={(e) => {this.handleScentFamilyChange(e.target.value)}}value={this.state.scent_family}>
                                            <option value="woody">Woody</option>
                                            <option value="spicy">Spicy</option>
                                            <option value="musk">Musk</option>
                                            <option value="fresh">Fresh</option>
                                            <option value="earthy">Earthy</option>
                                        </select> }
                                        {this.state.category === 'perfume' && 
                                        <select onChange={(e) => {this.handleScentFamilyChange(e.target.value)}}  value={this.state.scent_family}>
                                            <option value="floral">Floral</option>
                                            <option value="oceanic">Oceanic</option>
                                            <option value="citrus">Citrus</option>
                                            <option value="green">Green</option>
                                            <option value="gourmand">Gourmand</option>
                                        </select>
                                    }
                                </div>
                                    <button onClick={this.props.closed}>Close</button>
                                    <button onClick={this.editProduct}>Edit Product</button>
                                    <button onClick={this.deleteProduct}>Delete Product</button>
                                </div>
                            </div>
                            <div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default EditProduct
