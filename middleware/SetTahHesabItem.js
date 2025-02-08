const RegisterBuyItem = require("./RegisterBuyItem")
const RegisterBuyKala = require("./RegisterBuyKala")
const RegisterFaktorItem = require("./RegisterFaktorItem")

const SetTahHesabItem=async(cartItems,index)=>{
    if(cartItems.purchase){
        await RegisterBuyKala(cartItems,index,0)
        return await RegisterBuyItem(cartItems,index,0)
    }
    else if(cartItems.isMojood&&!cartItems.isReserve){
        //console.log(cartItems._id)
        return await RegisterFaktorItem(cartItems)
    }
    else if(cartItems.isReserve){
        return({error:"کالا رزرو شده است"})
        }
    else{
        return 0//await RegisterFaktorItem(cartItems._id)
    }
}

module.exports =SetTahHesabItem