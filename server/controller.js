module.exports = {
    getProductsByCategory: (req, res) => {
        const db =  req.app.get('db')
        const { category } = req.params

        db.get_products_by_category([category]).then(products => {
            res.status(200).json(products)
        }).catch(error => console.log('get products by category error', error))
    },
    getProduct: (req, res) => {
        const db =  req.app.get('db')
        const { product_id } = req.params
        
        db.get_product([product_id]).then(product => {
            res.status(200).json(product)
        }).catch(error => console.log('get product error', error))
    },
    
    getProducts: (req,res) => {
        const db = req.app.get('db')
        db.get_products([]).then( products => res.status(200).send(products))
        .catch( () => res.status(500).send())
    }
}