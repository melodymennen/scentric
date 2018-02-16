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
    getAllProducts: (req, res) => {
        const db = req.app.get('db')

        db.get_all_products([]).then( products => res.status(200).send(products))
        .catch( () => res.status(500).send())
    }, 
    addToCart: (req, res) => {
        const db =  req.app.get('db')
        const { generatedId } = req.session
        const { product_id } = req.body   
        
        db.check_carts([product_id, generatedId]).then(response => {
            if(response.length){
                db.increase_cart_qty([product_id, generatedId]).then(() => {
                    res.status(200).send('success')
                }).catch(error => console.log('update cart error', error))
            } else {
                 db.add_to_cart([generatedId, product_id, 1]).then(() => {
                     res.status(200).send('success')
                 }).catch(error => console.log('add to cart error', error))
            }
        }).catch(error => console.log('check carts error', error)) 
    },
    getCart: (req ,res) => {
        const db = req.app.get('db')
        const { generatedId } = req.session 
        console.log(generatedId);
        db.get_cart([generatedId]).then(cart => res.status(200).send(cart))
        .catch( () => res.status(500).send())
    }, 
    removeFromCart: (req, res) => {
        const db = req.app.get('db')
        const { product_id } = req.params                

        db.remove_from_cart([product_id]).then(() => {
            res.status(200).send('success')
        }).catch(error => console.log('remove from cart error',error))        
    },
    decreaseCartQty: (req, res) => {
        const db = req.app.get('db')
        const { product_id } = req.body  
        const { generatedId } = req.session                      

        db.decrease_cart_qty([product_id, generatedId]).then(() => {
            res.status(200).send('success')
        }).catch(error => console.log('decrease cart qty error',error))        
    },

    updateUser: (req, res) => {
        const db = req.app.get('db')
        const { user } = req.session
        const { newName, newEmail, newPicture } = req.body
        console.log(user.id, newName, newEmail, newPicture)
        db.update_user([user.id, newName, newEmail, newPicture]).then(() => {
            res.status(200).send('success')
        }).catch(error => console.log('update user error', error))
    }
}