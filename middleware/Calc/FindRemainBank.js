const NormalNumber = require("../NormalNumber")

const FindRemainBank=(cartDetails,transData)=>{
        var totalPrice = 0
        var totalPay = 0
        for(var i=0;i<transData.length;i++){
                totalPay+= NormalNumber(transData[i].payValue)
        }
        for(var i=0;i<cartDetails.length;i++){
                totalPrice+= NormalNumber(cartDetails[i].fullPrice)
        }
        var remain = totalPrice-totalPay
        return({totalPay,remain,totalPrice})
        
}

module.exports =FindRemainBank