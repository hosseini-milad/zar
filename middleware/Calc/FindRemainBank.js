const NormalNumber = require("../NormalNumber")

const FindRemainBank=(cartDetails,transData)=>{
        var totalPrice = 0
        var totalPay = 0
        for(var i=0;i<(transData&&transData.length);i++){
                //console.log(transData[i])
                totalPay+= NormalNumber(transData[i].payValue)
        }
        for(var i=0;i<(cartDetails&&cartDetails.length);i++){
                //console.log(cartDetails[i])
                if(cartDetails[i].purchase)
                        totalPrice-= NormalNumber(cartDetails[i].fullPrice)
                else
                        totalPrice+= NormalNumber(cartDetails[i].cartDetail.finalPrice)
        }
        var remain = totalPrice-totalPay
        return({totalPay,remain,totalPrice})
        
}

module.exports =FindRemainBank