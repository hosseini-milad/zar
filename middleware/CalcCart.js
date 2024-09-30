const customers = require("../models/auth/customers");
const cart = require("../models/product/cart");
const products = require("../models/product/products");
const CalcPrice = require("./CalcPrice");
const FindPrice = require("./FindPrice");
var ObjectID = require('mongodb').ObjectID;

const CalcCart=async(userId)=>{
    var totalWeight = 0
    var totalPrice = 0
    var unitPrice = 0
    const cartDetails = await cart.find({userId:userId}).lean()
    for(var c=0;c<cartDetails.length;c++){
        unitPrice = cartDetails.unitPrice
        totalPrice += parseFloat(cartDetails.price)
        totalWeight += parseFloat(cartDetails.weight&&
            cartDetails.weight.replace(/\//g,'.'))
    }
    return({cart:cartDetails,
        cartDetail: {
            "unitPrice": unitPrice,
            "cartDiscount": 0,
            "cartPrice": totalPrice,
            "cartWeight": totalWeight
        }
    })
}

module.exports =CalcCart