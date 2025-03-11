const NormalNumber=(numberRaw)=>{
    if(!numberRaw) return(0)
    var number = numberRaw.toString().replace(/\//g,'.')
    const RoundPrice = Math.round(parseFloat(number)/10000)
    const result = parseInt(RoundPrice)*10000
    return(result)
}

module.exports =NormalNumber