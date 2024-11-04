const prepaid = require("../models/param/prepaid");
const tax = require("../models/param/tax");
const cart = require("../models/product/cart");
const products = require("../models/product/products");
const CalcPrice = require("./CalcPrice");
const CalcPurchase = require("./CalcPurchase");
const FindPrice = require("./FindPrice");

const CreateCartPurchase=async(ayar,userId,weight)=>{
    
    const priceRaw = await FindPrice()
    const priceDetail = CalcPurchase(ayar,priceRaw,weight)
    const price = priceDetail.price
    await cart.create({
        title:"خرید متفرقه",
        weight:weight,
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