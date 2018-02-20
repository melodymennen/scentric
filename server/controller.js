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

        db.get_cart([generatedId]).then(cart => res.status(200).send(cart))
        .catch( () => res.status(500).send())
    }, 
    removeFromCart: (req, res) => {
        const db = req.app.get('db')
        const { product_id } = req.params                

        db.remove_from_cart([product_id]).then(() => {
            res.status(200).send('success')
        }).catch(error => console.log('remove from cart error', error))        
    },
    decreaseCartQty: (req, res) => {
        const db = req.app.get('db')
        const { product_id } = req.body  
        const { generatedId } = req.session                      

        db.decrease_cart_qty([product_id, generatedId]).then(() => {
            res.status(200).send('success')
        }).catch(error => console.log('decrease cart qty error', error))        
    },
    updateUser: (req, res) => {
        const db = req.app.get('db')
        const { user } = req.session
        const { newName, newEmail, newPicture, address } = req.body
        console.log(user.id, newName, newEmail, newPicture, address)
        db.update_user([user.id, newName, newEmail, newPicture, address]).then((user) => {
            req.session.user = user[0]
            res.status(200).send('success')
        }).catch(error => console.log('update user error', error))
    },
    getAllUsers: (req, res ) => {
        const db = req.app.get('db')

        db.get_users_all([]).then(users => {
            res.status(200).send(users)
        }).catch(error => console.log('get all users error', error))
    },
    getProductsByScent: (req, res) => {
        const db =  req.app.get('db') 
        const { category } = req.params

        db.get_products_by_scent([category]).then(products => {
            res.status(200).json(products)
        }).catch(error => console.log('get products by scent error', error))
    }, 
    deleteCart: (req, res) => {
        const db = req.app.get('db')
        const { generatedId } = req.session                      

        db.delete_cart([generatedId]).then(() => {
            res.status(200).send('success')
        }).catch(error => console.log('delete cart error', error)) 
    }, 
    addOrder: (req,res) => {
        const db = req.app.get('db')
        const { generatedId } = req.session 
        const { cart, subtotal } = req.body 

        db.new_order([generatedId, subtotal]).then(order => {
            const order_id = order[0].id
            res.status(200).json(order_id)
            
            cart.forEach(product => {
                db.add_order_items([order_id, product.product_id, product.price, product.qty]).then(() => {
                    res.status(200).send('success')
                }).catch(error => console.log('add order items error',error)) 
            })
        }).catch(error => console.log('new order error', error)) 
    }, 
    getOrder: (req, res) => {
        const db =  req.app.get('db')
        const { order_id } = req.params
        
        db.get_order([order_id]).then(order => {
            res.status(200).json(order)
        }).catch(error => console.log('get order error', error))
    }, 
    getAllOrders: (req, res) => {
        const db = req.app.get('db')
        
        db.get_all_orders([]).then(orders => {
            res.status(200).json(orders)
        }).catch( error => console.log('get all orders error' , error))
    },
    getOrdersByUser: (req, res) => {
        const db =  req.app.get('db')
        const { generatedId } = req.session 
        
        db.get_order([generatedId]).then(orders => {
            res.status(200).json(orders)
        }).catch(error => console.log('get order error', error))
    },
    addProduct: (req,res) => {
        const db = req.app.get('db')
        const {name, price, description, category, scent_family, image_url, on_sale} = req.body

        db.add_product([name, price, description, category, scent_family, image_url, on_sale]).then(product => {
            res.status(200).json(product)
        }).catch(error => console.log('add product', error))
    }, 
    addFavorite: (req, res) => {
        const db =  req.app.get('db')
        const { user } = req.session
        const { product_id } = req.body

        db.check_favorites([user.id, product_id]).then(response => {
            if(response.length){
                res.send('already a favorite')
            } else {
                db.add_favorite([user.id, product_id]).then(() => {
                    res.status(200).send('success')
                }).catch(error => console.log('add favorite error', error))
            }
        }).catch(error => console.log('check favorites error', error))    
    }, 
    getFavorites: (req, res, next) => {
        const db =  req.app.get('db')
        const { user } = req.session

        db.get_favorites([user.id]).then(favorites => {
            res.status(200).json(favorites)
        }).catch(error => console.log('get favorites error', error))
    }, 
    removeFavorite: (req, res) => {
        const db =  req.app.get('db')
        const { user } = req.session
        const { product_id } = req.params 

        db.remove_favorite([user.id, product_id]).then(() => {
            res.status(200).send('success')
        }).catch(error => console.log('remove favorite error', error))
    },
    logout: (req, res) => {
        const { user } = req.session
        req.session.destroy()
        res.status(200).send('success')
    }
}