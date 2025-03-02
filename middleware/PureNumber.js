var tax = process.env.TaxRate

const PureNumber=(number)=>{
    if(!number) return(0)
    var numberStr = number.toString()
    var result = parseInt(numberStr&&numberStr.replace(/\D/g,''))
    return(result)
}

module.exports =PureNumber