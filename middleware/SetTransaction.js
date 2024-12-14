const customers = require("../models/auth/customers")
const banks = require("../models/param/banks");
const transaction = require("../models/param/transaction");
const EnNumber = require("./enNumber");
const GetTahHesab = require("./GetTahHesab");
const PureNumber = require("./PureNumber");
var ObjectID = require('mongodb').ObjectID;

const SetTransaction=async(userId,faktorNo)=>{
    const date = new Date().toLocaleDateString('fa')
    const dateSplit = date.split('/')
    const userData = await customers.findOne({_id:ObjectID(userId)})
    var Shamsi_Year = PureNumber(EnNumber(dateSplit[0]))
    var Shamsi_Month = PureNumber(EnNumber(dateSplit[1]))
    var Shamsi_Day = PureNumber(EnNumber(dateSplit[2]))
    if(!userId||!faktorNo)return
    var transactionList = await transaction.find({userId:userId,orderNo:{$exists:false}})
    var result = []
    for(var i=0;i<transactionList.length;i++){
        var transItem = transactionList[i]
        var Sabte_Kol_Or_Movaghat_1_0=1
        var Moshtari_Code=userData.CustomerID 
        var Factor_Number=faktorNo
        var Radif_Number="1"
        var Shamsi_Year=Shamsi_Year
        var Shamsi_Month=Shamsi_Month
        var Shamsi_Day=Shamsi_Day
        var IsVoroodOrKhorooj_0_1="1" 
        var Mablagh=transItem.payValue
        var Sharh=transItem.title+"_"+transItem.description
        var query = [Sabte_Kol_Or_Movaghat_1_0,Moshtari_Code, 
            Factor_Number, Radif_Number,
            Shamsi_Year,Shamsi_Month,Shamsi_Day,
            IsVoroodOrKhorooj_0_1,Mablagh,Sharh]
        var payResult = await GetTahHesab(
            {"DoNewSanadVKHVaghNaghd":query})
        result.push({query,payResult})
    }
    await transaction.updateMany({userId:userId,orderNo:{$exists:false}},{
            $set:{orderNo:faktorNo,result}
        })
    
    
    
}
module.exports =SetTransaction