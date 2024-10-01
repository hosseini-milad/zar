const customers = require("../models/auth/customers");
const cart = require("../models/product/cart");
const products = require("../models/product/products");
const NormalNumber = require("./NormalNumber");
var ObjectID = require('mongodb').ObjectID;

const CalcCart=async(userId)=>{
    var totalWeight = 0
    var totalPrice = 0
    var unitPrice = 0
    const cartDetails = await cart.find({userId:userId}).lean()
    for(var c=0;c<cartDetails.length;c++){
        unitPrice = cartDetails[c].unitPrice
        totalPrice += parseFloat(cartDetails[c].price)
        totalWeight += parseFloat(cartDetails[c].weight&&
            cartDetails[c].weight.replace(/\//g,'.'))
    }
    return({cart:cartDetails,
        cartDetail: {
            "unitPrice": unitPrice,
            "cartDiscount": 0,
            "cartPrice": totalPrice,
            "cartWeight": NormalNumber(totalWeight)
        }
    })
}

module.exports =CalcCart