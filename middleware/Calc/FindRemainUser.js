const transaction = require("../../models/param/transaction")
const cart = require("../../models/product/cart")
const CalcCart = require("../CalcCart")
const FindRemainBank = require("./FindRemainBank")

const FindRemainUser=async(userId)=>{
        const cartDetails = await CalcCart(userId)
        var transData = userId?await transaction.find({userId:userId,orderNo:{$exists:false}}):''
        var payDetail = cartDetails.cartDetail
        var totalPay = payDetail&&payDetail.finalPrice
        var transRemain = FindRemainBank(transData,totalPay)
        return({...transRemain,transData})
}

module.exports =FindRemainUser