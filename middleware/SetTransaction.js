const banks = require("../models/param/banks")

const SetTransaction=async(userId,faktorNo)=>{
    if(!userId||!faktorNo)return
    await banks.updateMany({userId:userId,orderNo:{$exists:false}},{
            $set:{orderNo:faktorNo}
        })
    
}
module.exports =SetTransaction