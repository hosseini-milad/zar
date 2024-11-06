const FloatDec=(number,decRaw)=>{
    var dec = decRaw?decRaw:100
    var finalNumber = 0
    finalNumber = parseInt(number*dec)/dec
    return(finalNumber)
}

module.exports =FloatDec