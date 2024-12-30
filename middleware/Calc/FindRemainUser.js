const transaction = require("../../models/param/transaction")
const cart = require("../../models/product/cart")
const FindRemainBank = require("./FindRemainBank")

const FindRemainUser=async(userId)=>{
        const cartDetails = await cart.find({userId:userId})
        var transData = userId?await transaction.find({userId:userId,orderNo:{$exists:false}}):''
        var transRemain = FindRemainBank(cartDetails,transData)
        return(transRemain)
}

module.exports =FindRemainUser