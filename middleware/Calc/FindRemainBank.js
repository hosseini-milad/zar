const NormalNumber = require("../NormalNumber")

const FindRemainBank=(cartDetails,transData,totalDiscount)=>{
        //var totalPrice = 0
        var totalPay = 0
        for(var i=0;i<(transData&&transData.length);i++){
                //console.log(transData[i])
                totalPay+= NormalNumber(transData[i].payValue)
        }
        const totalPrice = cartDetails.cartDetails&&
                cartDetails.cartDetails.finalPrice
        var remain = totalPrice-totalPay
        return({totalPay,remain,totalPrice})
        
}

module.exports =FindRemainBank