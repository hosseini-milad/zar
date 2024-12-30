const customers = require("../../models/auth/customers")
const banks = require("../../models/param/banks");
const transaction = require("../../models/param/transaction");
const EnNumber = require("../enNumber");
const GetTahHesab = require("../GetTahHesab");
const PureNumber = require("../PureNumber");
var ObjectID = require('mongodb').ObjectID;

const SetDiscountTahHesab=async(userId,faktorNo,discount)=>{
    const date = new Date().toLocaleDateString('fa')
    const dateSplit = date.split('/')
    const userData = await customers.findOne({_id:ObjectID(userId)})
    var Shamsi_Year = PureNumber(EnNumber(dateSplit[0]))
    var Shamsi_Month = PureNumber(EnNumber(dateSplit[1]))
    var Shamsi_Day = PureNumber(EnNumber(dateSplit[2]))
    if(!userId||!faktorNo)return
    var Sabte_Kol_Or_Movaghat_1_0=1
    var Moshtari_Code=PureNumber(userData.cCode?userData.cCode:1)
    var Factor_Number=PureNumber(faktorNo)
    var Radif_Number=1
    var Shamsi_Year=Shamsi_Year
    var Shamsi_Month=Shamsi_Month
    var Shamsi_Day=Shamsi_Day
    var IsMaBeMoshtariOrMoshtariBeMa=0
    var Mablagh=PureNumber(discount)
    var Sharh=""
    var query = [Sabte_Kol_Or_Movaghat_1_0,Moshtari_Code, 
        Factor_Number, Radif_Number,
        Shamsi_Year,Shamsi_Month,Shamsi_Day,
        IsMaBeMoshtariOrMoshtariBeMa,Mablagh,Sharh]
    var payResult = await GetTahHesab(
            {"DoNewSanadTakhfif":query})
        
        
    await transaction.create({orderNo:faktorNo,result:{query,payResult}})
    
    
    
    
}
module.exports =SetDiscountTahHesab