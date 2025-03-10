const FloatDec = require("./FloatDec")

const {OJRAT_DEF,SENFI_DEF,TAX_DEF} = process.env
const CalcPrice=(product,price,TAX,discount)=>{
    if(!product) return(0)
    var floatWeight = parseFloat(product.weight&&
            product.weight.replace(/\//g,'.'))
    totalPrice = floatWeight*price
    var roundPrice = parseInt(Math.round(totalPrice*1000))/1000
    var discountPrice = roundPriceTemp(totalPrice*(discount?discount:0))/10000
    console.log("totalPrice: ",totalPrice)
    console.log("discount: ",discountPrice)
    var SENFI = product.sood?parseFloat(product.sood&&
            product.sood.replace(/\//g,'.')):SENFI_DEF
    var OJRAT = product.ojrat?parseFloat(product.ojrat&&
            product.ojrat.replace(/\//g,'.')):OJRAT_DEF
    var poolSang = product.poolSang
    var ojratPrice = parseFloat(OJRAT)*roundPrice/100
    var senfiPrice = parseFloat(roundPrice+ojratPrice)*(SENFI/100)
    var taxValue = parseFloat(TAX?TAX:TAX_DEF)/100

    var taxPrice = (senfiPrice+ojratPrice) * taxValue
    
    var totalPrice = taxPrice+senfiPrice+ojratPrice+roundPrice
    
    var finalPrice = roundPriceTemp(totalPrice-discountPrice)
    var priceDetail = { 
        taxValue:TAX, taxPrice:roundPriceTemp(taxPrice),
        ojratValue:OJRAT, ojratPrice:roundPriceTemp(ojratPrice),
        senfiValue:SENFI , senfiPrice:roundPriceTemp(senfiPrice),
        poolSang:poolSang, unitPrice:price,
        totalDiscount:discountPrice,
        unitGold:roundPriceTemp(totalPrice/floatWeight),//FloatDec(totalPrice/floatWeight,0),
        goldPrice:roundPrice, weight:floatWeight,
        totalPrice:totalPrice,roundPrice:finalPrice
    }
    return({price:totalPrice,priceDetail:priceDetail})
}
const roundPriceTemp = (price)=>{
     var tempPrice = parseInt(Math.round(price)/1000)*1000
     return(tempPrice)
}

module.exports =CalcPrice