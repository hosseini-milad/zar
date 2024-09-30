const customers = require("../models/auth/customers");
const cart = require("../models/product/cart");
const products = require("../models/product/products");
const CalcPrice = require("./CalcPrice");
const FindPrice = require("./FindPrice");
var ObjectID = require('mongodb').ObjectID;

const CalcCartRecalc=async(userId)=>{
    const priceRaw = await FindPrice() 
    const cartDetails = await cart.find({userId:userId}).lean()
    for(var c=0;c<cartDetails.length;c++){
    //const ItemId = 
        const productDetail = 
            await products.findOne({sku:cartDetails[c].sku})
            
        var tempPrice = CalcPrice(productDetail,priceRaw)
        
        await cart.updateOne({_id:ObjectID(cartDetails[c]._id)},
            {$set:{price:tempPrice,unitPrice:priceRaw,progressDate:Date.now()}})
    }
    return(1)
}

module.exports =CalcCartRecalc