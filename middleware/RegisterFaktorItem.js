const customers = require("../models/auth/customers");
const faktor = require("../models/product/faktor");
const faktorItems = require("../models/product/faktorItems");
const GetTahHesab = require("./GetTahHesab");
var ObjectID = require('mongodb').ObjectID;

const RegisterFaktorItem=async(faktorNoId)=>{
    const faktorRow = await faktorItems.findOne({_id:ObjectID(faktorNoId)})
    if(!faktorRow){
        return({error:"شماره ردیف پیدا نشد"})
    }
    const customerData = await customers.findOne({phone:faktorRow.phone})
    const date = new Date(faktorRow.initDate).toLocaleDateString('fa')
    const dateSplit = date.split('/')
    var query = ''
    var result = ''
    var isMojood = faktorRow.isMojood&&!faktorRow.isReserve
    var faktorPrice = faktorRow.priceDetail
    if(!isMojood) return({error:"آیتم موجود نیست"})
    var Sabte_Kol_Or_Movaghat_1_0 = 0 
    var Moshtari_Code = customerData.cCode
    var Factor_Number = faktorRow.faktorNo
    var Radif_Number = 1
    var Shamsi_Year = dateSplit[0]
    var Shamsi_Month = dateSplit[1]
    var Shamsi_Day = dateSplit[2]
    var BuyOrSale_0_1 = 1
    var Mazaneh = faktorPrice.unitPrice
    var MazanehIsMesghalOrGeram_0_1 = 1
    var MablaghKol = faktorPrice.roundPrice
    var OjratTedadiOrGerami_0_1 = 1
    var Darsad_Maliat = faktorPrice.taxValue
    var MeghdarMaliat = faktorPrice.taxPrice
    var Darsad_Sood = faktorPrice.senfiValue
    var Darsad_Talayee =0
    var IsMarjoo_1_0 =0
    var PoolSang=0
    var PictureFileName
    var Ojrat = faktorPrice.ojratValue
    var Shenase=faktorRow.sku
    var query = [
        Sabte_Kol_Or_Movaghat_1_0, Moshtari_Code, Factor_Number, Radif_Number, 
        Shamsi_Year, Shamsi_Month, Shamsi_Day, 0, 
        0, 0,  "", BuyOrSale_0_1, 
        Mazaneh, MazanehIsMesghalOrGeram_0_1, MablaghKol, OjratTedadiOrGerami_0_1, 
        Darsad_Maliat, MeghdarMaliat, Darsad_Sood, Darsad_Talayee, 
        IsMarjoo_1_0, PoolSang, PictureFileName, Ojrat, Shenase
    ]
        var customerList = await GetTahHesab(
            {"DoNewSanadBuySaleEtiket":query}
        )
    return({query,customerList,message:"outPut"})
}

module.exports =RegisterFaktorItem