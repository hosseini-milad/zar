const FloatDec = require("./FloatDec")
const NormalNumber = require("./NormalNumber")

const {OJRAT_DEF,SENFI_DEF,TAX_DEF} = process.env
const CalcPrice=(product,price,TAX,discount)=>{
    if(!product) return(0)
    var featurePrice = 0
    var floatWeight = parseFloat(product.weight&&
            product.weight.replace(/\//g,'.'))
    var SENFI = product.sood?parseFloat(product.sood&&
            product.sood.replace(/\//g,'.')):SENFI_DEF
    var OJRAT = product.ojrat?parseFloat(product.ojrat&&
            product.ojrat.replace(/\//g,'.')):OJRAT_DEF
    var taxValue = parseFloat(TAX?TAX:TAX_DEF)/100

    if(product.feature) {
        var eq = floatWeight*OJRAT/100
        var weightEq = eq+floatWeight
        featurePrice = NormalNumber(weightEq*(1+taxValue)*price)
    }
    totalPrice = floatWeight*price
    var roundPrice = parseInt(Math.round(totalPrice*1000))/1000
    var discountPrice = roundPriceTemp(totalPrice*(discount?discount:0))/10000
    var poolSang = product.poolSang
    var ojratPrice = parseFloat(OJRAT)*roundPrice/100
    var senfiPrice = parseFloat(roundPrice+ojratPrice)*(SENFI/100)

    var taxPrice = (senfiPrice+ojratPrice) * taxValue
    
    var totalPrice = taxPrice+senfiPrice+ojratPrice+roundPrice
    
    if(featurePrice)taxPrice = featurePrice * taxValue

    var finalPrice = NormalNumber(totalPrice-discountPrice)
    var priceDetail = { 
        taxValue:TAX, taxPrice:NormalNumber(taxPrice),
        ojratValue:OJRAT, ojratPrice:NormalNumber(ojratPrice),
        senfiValue:SENFI , senfiPrice:NormalNumber(senfiPrice),
        poolSang:poolSang, unitPrice:price,
        totalDiscount:discountPrice,
        unitGold:NormalNumber(totalPrice/floatWeight),//FloatDec(totalPrice/floatWeight,0),
        goldPrice:roundPrice, weight:floatWeight,
        totalPrice:totalPrice,roundPrice:featurePrice?featurePrice:finalPrice
    }
    return({price:featurePrice?featurePrice:NormalNumber(totalPrice),
        priceDetail:priceDetail})
}
const roundPriceTemp = (price)=>{
     var tempPrice = parseInt(Math.round(price)/1000)*1000
     return(tempPrice)
}

module.exports =CalcPrice