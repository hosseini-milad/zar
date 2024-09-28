const {OJRAT,TAX,SENFI} = process.env
const CalcPrice=(weight,price)=>{
    var floatWeight = parseFloat(weight.replace(/\//g,'.'))
    totalPrice = floatWeight*price
    var roundPrice = parseInt(Math.round(totalPrice*1000))/1000
    var ojratPrice = parseFloat(OJRAT)*roundPrice
    var senfiPrice = parseFloat(roundPrice+ojratPrice)*SENFI

    var taxPrice = (senfiPrice+ojratPrice) * TAX

    var totalPrice = taxPrice+senfiPrice+ojratPrice+roundPrice
    return(parseInt(Math.round(totalPrice)))
}

module.exports =CalcPrice