const prepaid = require("../models/param/prepaid");
const tax = require("../models/param/tax");
const cart = require("../models/product/cart");
const products = require("../models/product/products");
const CalcPrice = require("./CalcPrice");
const CalcPurchase = require("./CalcPurchase");
const FindPrice = require("./FindPrice");

const CreateCartPurchase=async(data,userId)=>{
    
    const priceRaw = await FindPrice()
    const priceDetail = CalcPurchase(data.ayar,priceRaw,data.weight)
    const price = data.price?data.price:priceDetail.price
    await cart.create({
        title:data.title,
        purchaseType:data.purchaseType,
        weight:data.weight,
        priceDetail:priceDetail.priceDetail,
        price:price,
        fullPrice:price,
        unitPrice:priceRaw,
        purchase:true,
        userId:userId
    })
    
    return({message:"done"})
}

module.exports =CreateCartPurchase