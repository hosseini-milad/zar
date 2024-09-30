const {TAX} = process.env
const CalcPrice=(product,price)=>{
    if(!product) return(0)
    var floatWeight = parseFloat(product.weight&&
            product.weight.replace(/\//g,'.'))
    totalPrice = floatWeight*price
    var roundPrice = parseInt(Math.round(totalPrice*1000))/1000
    var SENFI = parseFloat(product.sood&&
            product.sood.replace(/\//g,'.'))
    var OJRAT = parseFloat(product.ojrat&&
            product.ojrat.replace(/\//g,'.'))

    var ojratPrice = parseFloat(OJRAT)*roundPrice/100
    var senfiPrice = parseFloat(roundPrice+ojratPrice)*(SENFI/100)

    var taxPrice = (senfiPrice+ojratPrice) * TAX

    var totalPrice = taxPrice+senfiPrice+ojratPrice+roundPrice
    return(parseInt(Math.round(totalPrice)))
}

module.exports =CalcPrice