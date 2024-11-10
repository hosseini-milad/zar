const banks = require("../models/param/banks")

const SetTransaction=async(bankData,userId,faktorNo)=>{
    if(!bankData)return
    for(var i=0;i<bankData.length;i++){
        await banks.create({
            title:bankData[i].title,
            bankCode:bankData[i].bankCode,
            userId:userId,
            orderNo:faktorNo,
            payValue:bankData[i].payValue,
            description:bankData[i].description,
            date:Date.now()
        })
    }
    
}
module.exports =SetTransaction