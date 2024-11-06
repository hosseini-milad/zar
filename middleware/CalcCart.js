const customers = require("../models/auth/customers");
const cart = require("../models/product/cart");
const products = require("../models/product/products");
const FloatDec = require("./FloatDec");
const NormalNumber = require("./NormalNumber");
var ObjectID = require('mongodb').ObjectID;

const CalcCart=async(userId,remainRaw)=>{
    var totalWeight = 0
    var remain = remainRaw?remainRaw:0
    var totalPrice = 0
    var unitPrice = 0
    var goldUnit = []
    const cartDetails = await cart.find({userId:userId}).lean()
    for(var c=0;c<cartDetails.length;c++){
        unitPrice = cartDetails[c].unitPrice
        var cartPrice = parseFloat(cartDetails[c].price)
        if(cartDetails[c].purchase){
            totalPrice -= cartPrice
            totalWeight -= parseFloat(cartDetails[c].weight&&
                cartDetails[c].weight.replace(/\//g,'.'))
        } 
        else {
            var weight = parseFloat(cartDetails[c].weight&&
                cartDetails[c].weight.replace(/\//g,'.'))
            goldUnit.push({weight:weight,price:cartPrice})
            totalPrice += cartPrice 
            totalWeight += weight
        }
    }
    return({cart:cartDetails,
        cartDetail: {
            "unitPrice": unitPrice,
            "cartDiscount": 0,
            "cartPrice": totalPrice,
            "cartWeight": FloatDec(totalWeight,2),
            "remainUser":remain,
            "finalGoldUnit":calcUnit(goldUnit),
            "finalPrice":totalPrice-remain
        },
        purchaseType:[
            {title:"خرید متفرقه",id:1,unitPrice:unitPrice},
            {title:"خرید آبشده",id:2,unitPrice:unitPrice},
            {title:"خرید سکه",id:3,unitPrice:unitPrice}
        ]
    })
}
const calcUnit=(goldArray)=>{
    if(!goldArray || !goldArray.length)return(0)
    var total = 0;
    var weight = 0
    for(var i=0; i<goldArray.length;i++){
        total += goldArray[i].price
        weight += goldArray[i].weight
    }
    return(total/weight)
}
module.exports =CalcCart