import React, { Component } from 'react'
import axios from 'axios'
import Admin from './Admin'


class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: [],
            name: '',
            description: '',
            price: '',
            category: ''
        }
    }

    // componentWillReceiveProps(props){
    //     this.getProduct(props.id)
    // }

    componentDidMount(props) {
        this.getProduct(this.props.id)
    }


    getProduct(id){
        axios.get(`/api/admin/${id}`).then(response => {
            this.setState({product: response.data[0]})
            console.log('resosone',response.data)
         })
    }

    handleNameChange(value){
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

    render() {
        const e = this.state.product
        console.log('df', e)
        return (
            <div className="edit_products_modal_backdrop">
                <div className="edit_products_modal">
                        <div className="edit_products_name">{e.name}</div>
                    <div>
                        <div className="edit_product_flex">
                                <div>
                                    <img src={e.image_url} alt="product" width="200px"/>
                                </div>
                                <div>
                                    <div className="modal_title">
                                        <div>Name</div>
                                        
                                        <input onChange={(e)=> this.handleNameChange(e.target.value)} value={e.name}/>
                                    </div>
                                    <div className="modal_title">
                                        <div>Description</div>
                                        <textarea onChange={(e) => {this.handleDescriptionChange(e.target.value)}}value={e.description} resize="none"/>
                                    </div>
                                    <div className="modal_title">
                                        <div>Price</div>
                                        <input onChange={(e) => this.handlePriceChange(e.target.value)} value={e.price}/>
                                    </div>
                                    <div className="modal_sale">
                                        <div>Sale:</div>
                                        <div>{e.sale ? <span>On Sale</span> : <span>Not on Sale</span>}</div>
                                    </div>
                                    <div className="modal_select">
                                        <select onChange={(e) => this.handleCategoryChange(e.target.value)} value={e.category}>
                                            <option value="perfume">Perfume</option>
                                            <option value="cologne">Cologne</option>
                                        </select>
                                        {e.category === 'cologne'&& 
                                        <select value={e.scent_family} >
                                            <option value="woody">Woody</option>
                                            <option value="spicy">Spicy</option>
                                            <option value="musk">Musk</option>
                                            <option value="fresh">Fresh</option>
                                            <option value="earthy">Earthy</option>
                                        </select> }
                                        {e.category === 'perfume' && 
                                        <select value={e.scent_family} >
                                            <option value="floral">Floral</option>
                                            <option value="oceanic">Oceanic</option>
                                            <option value="citrus">Citrus</option>
                                            <option value="green">Green</option>
                                            <option value="gourmand">Gourmand</option>
                                        </select>
                                    }
                                </div>
                                    <button onClick={this.props.closed}>Close</button>
                                    <button>Edit</button>
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
