import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProducts} from '../ducks/reducer'
import ProductModule from './ProductModule'
import Header from './Header'


class NewArrivals extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.getProducts()
        window.scrollTo(0,0)
    }

    getProducts(){
        this.props.getProducts()
    }

    render() {
       const sale = this.props.products.reverse().splice(0,5).map(e => {
            return ( 
                <div>
                    <ProductModule
                        name={e.name}
                        description={e.description}
                        price={e.price}
                        pic={e.image_url}
                        id={e.id}
                        />
                </div>
            )
        })
        return (
            <div>
                <Header />
                <div className="home_hero">
                <div className="home_flex">{sale}</div>
                </div>
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


