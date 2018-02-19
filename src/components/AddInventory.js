import React, { Component } from 'react'


class Inventory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectTitle: '',
            selectDescription: '',
            selectimage: '',
            selectPrice: '',
            selectCategory: '',
            selectScentFamily: '',
        }
    }

    handleTitleChange(value){
        console.log(value)
        this.setState({
            selectTitle: value
        })
    }
    handleDescriptionChange(value){
        console.log(value)
        this.setState({
            selectDescription: value
        })
    }
    handleImageChange(value){
        console.log(value)
        this.setState({
            selectImage: value
        })
    }
    handlePriceChange(value){
        console.log(value)
        this.setState({
            selectPrice: value
        })
    }
    handleCategoryChange(value){
        console.log(value)
        this.setState({
            selectCategory: value
        })
    }
    handleScentFamilyChange(value){
        console.log(value)
        this.setState({
            selectScentFamily: value
        })
    }

    render() {
        return (
            <div>
                <div className="inventory_admin_panel_title">Add Inventory</div>
                <div className="inventory_admin_panel">
                    <div><input placeholder="Title" onChange={(e)=>this.handleTitleChange(e.target.value)}/></div>
                    <div><textarea placeholder="Description" onChange={(e)=>this.handleDescriptionChange(e.target.value)}/></div>
                    <div><input placeholder="Price" onChange={(e)=>this.handlePriceChange(e.target.value)}/></div>
                    <div><input placeholder="Image" onChange={(e)=>this.handleImageChange(e.target.value)}/></div>
                    <div><select onChange={(e)=>this.handleCategoryChange(e.target.value)}>
                        <option>Category</option>
                        <option value="perfume">Perfume</option>
                        <option value="cologne">Cologne</option>
                    </select>
                    </div>
                    <div>
                    {this.state.selectCategory === 'perfume' &&
                        <select onChange={(e)=>this.handleScentFamilyChange(e.target.value)}>
                            <option>Scent Family</option>
                            <option value="floral">Floral</option>
                            <option value="oceanic">Oceanic</option>
                            <option value="citrus">Citrus</option>
                            <option value="green">Green</option>
                            <option value="gourmand">Gourmand</option>
                        </select>}
                    {this.state.selectCategory === 'cologne' &&
                        <select onChange={(e)=>this.handleScentFamilyChange(e.target.value)}>
                            <option>Scent Family</option>
                            <option value="woody">Woody</option>
                            <option value="spicy">Spicy</option>
                            <option value="musk">Musk</option>
                            <option value="fresh">Fresh</option>
                            <option value="earthy">Earthy</option>
                        </select>
                    }
                    </div>
                    <div><button className="button">Add Product</button></div>
                </div>
            </div>
        )
    }
}


export default Inventory
