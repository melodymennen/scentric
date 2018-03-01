const functions = require('../utilities/functions')

var response = {data: [{category:"cologne",id:90,name:"bigg dogg danny luv",on_sale:false,price:"199.98",product_id:90,qty:1,scent_family:"spicy"}, {category:"cologne",id:82,name:"elon (musk)",on_sale:true,price:"99.99",product_id:82,qty:2,scent_family:"musk"}]}
var response2 = {data: [{category:"cologne",id:90,name:"bigg dogg danny luv",on_sale:false,price:"9.98",product_id:90,qty:4,scent_family:"spicy"}, {category:"cologne",id:82,name:"elon (musk)",on_sale:true,price:"999.99",product_id:82,qty:1,scent_family:"musk"}]}
var response3 = {data: [{category:"cologne",id:90,name:"bigg dogg danny luv",on_sale:false,price:"1.98",product_id:90,qty:12,scent_family:"spicy"}, {category:"cologne",id:82,name:"elon (musk)",on_sale:true,price:"9.99",product_id:82,qty:6,scent_family:"musk"}]}

// checkEmail
test('check sup@whats.com', () => {
    expect(functions.isEmail('sup@whats.com')).toBe(true)
})

test('check hello.com', () => {
    expect(functions.isEmail('hello.com')).toBe(false)
})

test('check bye', () => {
    expect(functions.isEmail('bye')).toBe(false)
})

// getCart
test('check response returns correct object', () => {
    functions.getCart(response);
    expect.objectContaining({
        cart: 
            [ { category: 'cologne',
                id: 90,
                name: 'bigg dogg danny luv',
                on_sale: false,
                price: '199.98',
                product_id: 90,
                qty: 1,
                scent_family: 'spicy' },
              { category: 'cologne',
                id: 82,
                name: 'elon (musk)',
                on_sale: true,
                price: '99.99',
                product_id: 82,
                qty: 2,
                scent_family: 'musk' } ],
           subtotal: 399.96,
           qty: 3
    })
})

test('check response2 returns correct object', () => {
    functions.getCart(response2);
    expect.objectContaining({
        subtotal: 1039.91,
        qty: 5
    })
})

test('check response3 returns correct object', () => {
    functions.getCart(response3);
    expect.objectContaining({
        subtotal: 83.69999999999999,
        qty: 18
    })
})
