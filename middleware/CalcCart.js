const customers = require("../models/auth/customers");
const cart = require("../models/product/cart");
var ObjectID = require('mongodb').ObjectID;

const CalcCart=async(userId)=>{
    var totalPrice = 0
    var totalCount = 0
    const userDetail = await customers.findOne({_id:ObjectID(userId)})
    const cartDetails = await cart.find({userId:userId}).lean()
    for(var c=0;c<cartDetails.length;c++){
    //const ItemId = 
    
    totalCount += parseInt(cartDetails[c].count)
    }
    return(cartDetails)
}

module.exports =CalcCart