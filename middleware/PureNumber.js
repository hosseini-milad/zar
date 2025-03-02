var tax = process.env.TaxRate

const PureNumber=(number)=>{
    var numberStr = number.toString()
    var result = parseInt(numberStr&&numberStr.replace(/\D/g,''))
    return(result)
}

module.exports =PureNumber