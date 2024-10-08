const customers = require("../models/auth/customers");
const faktor = require("../models/product/faktor");
const faktorItems = require("../models/product/faktorItems");
var ObjectID = require('mongodb').ObjectID;

const RegisterFaktor=async(faktorNo)=>{
    
    const faktorData = await faktor.findOne({faktorNo:faktorNo}).lean()
    const faktorItemsData = await faktorItems.find({faktorNo:faktorNo})
    const customerData = await customers.findOne({_id:ObjectID(faktorData.userId)})
    faktorData.items = faktorItemsData
    const date = new Date(faktorData.initDate).toLocaleDateString('fa')
    const dateSplit = date.split('/')
    console.log(date)

    var Sabte_Kol_Or_Movaghat_1_0 = 0 
    var Moshtari_Code = customerData.cCode
    var Factor_Number = 1234
    var Radif_Number = 1
    var Shamsi_Year = dateSplit[0]
    var Shamsi_Month = dateSplit[1]
    var Shamsi_Day = dateSplit[2]
    var BuyOrSale_0_1 = 1
    var Mazaneh = faktorData.unitPrice
    var MazanehIsMesghalOrGeram_0_1 = 1
    var MablaghKol = faktorData.totalPrice
    var OjratTedadiOrGerami_0_1 = 1
    var Darsad_Maliat = 9
    var MeghdarMaliat =0 
    var Darsad_Sood =0
    var Darsad_Talayee =0
    var IsMarjoo_1_0 =0
    var PoolSang=0
    var PictureFileName
    var Ojrat
    var Shenase
    const sendQuery = [
        Sabte_Kol_Or_Movaghat_1_0, Moshtari_Code, Factor_Number, Radif_Number, 
        Shamsi_Year, Shamsi_Month, Shamsi_Day, 0, 
        0, 0,  "", BuyOrSale_0_1, 
        Mazaneh, MazanehIsMesghalOrGeram_0_1, MablaghKol, OjratTedadiOrGerami_0_1, 
        Darsad_Maliat, MeghdarMaliat, Darsad_Sood, Darsad_Talayee, 
        IsMarjoo_1_0, PoolSang, PictureFileName, Ojrat, Shenase
    ]
    return(sendQuery)
}

module.exports =RegisterFaktor