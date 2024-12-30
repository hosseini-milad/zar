
const FindRemainUser=async(userId)=>{
        const cartDetails = await cart.find({userId:userId})
        var transData = userId?await transactions.find({userId:userId,orderNo:{$exists:false}}):''
        var transRemain = FindRemainBank(cartDetails,transData)
        return(transRemain)
}

module.exports =FindRemainUser