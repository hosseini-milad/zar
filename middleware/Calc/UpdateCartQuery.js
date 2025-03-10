
const products = require("../../models/product/products");
const NormalNumber = require("../NormalNumber");
const {OJRAT_DEF,SENFI_DEF,TAX_DEF} = process.env

const UpdateCartQuery=async(cartItem,price,TAX,discountTemp)=>{
    const product = await products.findOne({sku:cartItem.sku})
    if(!product) return(0)
    var discount = discountTemp?discountTemp:cartItem.discount
    var floatWeight = parseFloat(product.weight&&
            product.weight.replace(/\//g,'.'))
    totalPrice = floatWeight*price
    var roundPrice = parseInt(Math.round(totalPrice*1000))/1000
    var SENFI = product.sood?parseFloat(product.sood&&
            product.sood.replace(/\//g,'.')):SENFI_DEF
    var OJRAT = product.ojrat?parseFloat(product.ojrat&&
            product.ojrat.replace(/\//g,'.')):OJRAT_DEF
    var poolSang = product.poolSang?product.poolSang:0
    var ojratPrice = parseInt(Math.round(parseFloat(OJRAT)*roundPrice/100))
    var senfiPrice = parseFloat(roundPrice+ojratPrice)*(SENFI/100)
    var taxValue = parseFloat(TAX?TAX:TAX_DEF)/100

    var taxPrice = (senfiPrice+ojratPrice) * taxValue
    var totalPrice = taxPrice+senfiPrice+ojratPrice+roundPrice
    var totalDiscount = NormalNumber(totalPrice*discount/10000)
    var disPrice = totalPrice-totalDiscount
    console.log(totalPrice,totalDiscount)
    var finalPrice = parseInt(Math.round(disPrice)/100)*100
    var priceDetail = { 
        taxValue:TAX, taxPrice:taxPrice,
        ojratValue:OJRAT, ojratPrice:ojratPrice,
        senfiValue:SENFI , senfiPrice:senfiPrice,
        totalDiscount:totalDiscount,
        poolSang:poolSang, unitPrice:price,
        unitGold:parseInt(Math.round((disPrice/floatWeight)/1000)*1000),//FloatDec(totalPrice/floatWeight,0),
        goldPrice:roundPrice, weight:floatWeight,
        totalPrice:totalPrice,roundPrice:finalPrice
    }
    //console.log(priceDetail)
    return(priceDetail)
        
}

module.exports =UpdateCartQuery