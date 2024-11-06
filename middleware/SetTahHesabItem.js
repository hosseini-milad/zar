const RegisterFaktorItem = require("./RegisterFaktorItem")

const SetTahHesabItem=async(cartItems,index)=>{
    if(cartItems.purchase){
        await RegisterFaktorItem(cartItems._id)
    }
    else if(cartItems.isMojood&&!cartItems.isReserve){
        console.log(cartItems._id)
        //await RegisterFaktorItem(cartItems._id)
    }
}

module.exports =SetTahHesabItem