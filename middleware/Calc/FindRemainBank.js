const NormalNumber = require("../NormalNumber")

const FindRemainBank=(transData,totalPrice)=>{
        var totalPay = 0
        for(var i=0;i<(transData&&transData.length);i++){
                //console.log(transData[i])
                totalPay+= NormalNumber(transData[i].payValue)
        }
        var remain = totalPrice-totalPay
        return({totalPay,remain,totalPrice})
        
}

module.exports =FindRemainBank