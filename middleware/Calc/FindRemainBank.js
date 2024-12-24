const transaction = require("../../models/param/transaction")
const cart = require("../../models/product/cart")
const NormalNumber = require("../NormalNumber")

const FindRemainBank=async(userId)=>{
        var totalPrice = 0
        var totalPay = 0
        var bankDetail = await transaction.find({userId:userId,orderNo:{$exists:false}})
        const orderDetail = await cart.find({userId:userId})
        for(var i=0;i<bankDetail.length;i++){
                totalPay+= NormalNumber(bankDetail[i].payValue)
        }
        for(var i=0;i<orderDetail.length;i++){
                totalPrice+= NormalNumber(orderDetail[i].fullPrice)
        }
        var remain = totalPrice-totalPay
        return({transData:bankDetail,totalPay,remain,totalPrice})
        
}

module.exports =FindRemainBank