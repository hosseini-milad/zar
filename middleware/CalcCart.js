const customers = require("../models/auth/customers");
const cart = require("../models/product/cart");
const products = require("../models/product/products");
var ObjectID = require('mongodb').ObjectID;

const CalcCart=async(userId)=>{
    var totalPrice = 0
    var totalCount = 0
    const userDetail = await customers.findOne({_id:ObjectID(userId)})
    const cartDetails = await cart.find({userId:userId}).lean()
    for(var c=0;c<cartDetails.length;c++){
    //const ItemId = 
    cartDetails[c].productDetail = 
        await products.findOne({sku:cartDetails[c].sku})
    totalCount += parseInt(cartDetails[c].count)
    }
    return({cart:cartDetails,
        cartDetail: {
            "cartPrice": 1563636,
            "cartDiscount": 0,
            "cartWeight": 1,
            "cartTax": 156363,
            "cartTotal": 1719999,
            "cartCount": 1
        }
    })
}

module.exports =CalcCart