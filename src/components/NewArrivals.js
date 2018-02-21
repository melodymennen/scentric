import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProducts} from '../ducks/reducer'


class NewArrivals extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts(){
        this.props.getProducts()
    }

    render() {
       const sale = this.props.products.splice(5,14).map(e => {
            return ( 
                <div>
                    {e.name}
                </div>
            )
        })
        return (
            <div>
                <div>{sale}</div>
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
    getProducts: getProducts,

}


export default connect(mapStateToProps, mapDispatchToProps)(NewArrivals)


