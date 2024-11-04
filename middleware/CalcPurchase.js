const {OJRAT_DEF,SENFI_DEF,TAX_DEF} = process.env
const CalcPurchase=(Ayar,price,weight)=>{
    if(!weight||!Ayar) return(0)
    var floatWeight = parseFloat(weight.replace(/\//g,'.'))
    var ayarPercent = parseFloat(Ayar)/750
    var ayarRound = Math.round(floatWeight*ayarPercent*100)/100
    var finalPrice = ayarRound*price
    
    var priceDetail = {
        Ayar:Ayar, ayarPercent:ayarRound,
        unitPrice:price, weight:floatWeight,
        roundPrice:finalPrice
    }
    return({price:finalPrice,priceDetail:priceDetail})
}

module.exports =CalcPurchase