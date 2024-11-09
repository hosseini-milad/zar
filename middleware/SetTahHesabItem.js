const RegisterBuyItem = require("./RegisterBuyItem")
const RegisterFaktorItem = require("./RegisterFaktorItem")

const SetTahHesabItem=async(cartItems,index)=>{
    if(cartItems.purchase){
        return await RegisterBuyItem(cartItems,index,0)
    }
    else if(cartItems.isMojood&&!cartItems.isReserve){
        console.log(cartItems._id)
        //await RegisterFaktorItem(cartItems._id)
    }
}

module.exports =SetTahHesabItem