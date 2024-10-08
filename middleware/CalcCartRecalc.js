const customers = require("../models/auth/customers");
const tax = require("../models/param/tax");
const cart = require("../models/product/cart");
const products = require("../models/product/products");
const CalcPrice = require("./CalcPrice");
const FindPrice = require("./FindPrice");
var ObjectID = require('mongodb').ObjectID;

const CalcCartRecalc=async(userId)=>{
    const priceRaw = await FindPrice() 
    const cartDetails = await cart.find({userId:userId}).lean()
    
    var TAX = await tax.findOne().sort({date:-1})
    for(var c=0;c<cartDetails.length;c++){
    //const ItemId = 
        const productDetail = 
            await products.findOne({sku:cartDetails[c].sku})
        const priceDetail = CalcPrice(productDetail,priceRaw,TAX&&TAX.percent)
        var tempPrice = priceDetail.price
        
        await cart.updateOne({_id:ObjectID(cartDetails[c]._id)},
            {$set:{price:tempPrice,unitPrice:priceRaw,progressDate:Date.now()}})
    }
    return(1)
}

module.exports =CalcCartRecalc