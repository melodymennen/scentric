import React, { Component } from 'react'


class ViewInventory extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.props.getCart()
    }

    render() {
        return (
            <div>
               
            </div>
        )
    }
}



export default ViewInventory
