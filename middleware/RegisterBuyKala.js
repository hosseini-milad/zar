const customers = require("../models/auth/customers");
const faktor = require("../models/product/faktor");
const faktorItems = require("../models/product/faktorItems");
const EnNumber = require("./enNumber");
const GetTahHesab = require("./GetTahHesab");
const PureNumber = require("./PureNumber");
var ObjectID = require('mongodb').ObjectID;

const RegisterBuyKala=async(faktorRow,indexRaw)=>{
    var index = indexRaw?indexRaw:1
    const type = (faktorRow.title&&faktorRow.title.includes("متفرقه"))?0:1
    const customerData = await customers.findOne({phone:faktorRow.phone})
    const date = new Date(faktorRow.initDate).toLocaleDateString('fa')
    const dateSplit = date.split('/')
    var query = ''
    var faktorPrice = faktorRow.priceDetail
    var Sabte_Kol_Or_Movaghat_1_0 = 1 
    var Moshtari_Code = PureNumber(customerData.cCode)
    var Factor_Number = PureNumber(faktorRow.faktorNo)
    var Radif_Number = index
    var Shamsi_Year = PureNumber(EnNumber(dateSplit[0]))
    var Shamsi_Month = PureNumber(EnNumber(dateSplit[1]))
    var Shamsi_Day = PureNumber(EnNumber(dateSplit[2]))
    var BuyOrSale_0_1 = 0
    var Mazaneh = faktorPrice.unitPrice
    var MazanehIsMesghalOrGeram_0_1 = 1
    var MablaghKol = faktorPrice.roundPrice
    var Ang_Number = faktorRow.riang?Number(faktorRow.riang):0
    var Name_az = faktorRow.lab?faktorRow.lab:""
    var Vazn = faktorPrice.weight
    var Ayar = Number(faktorPrice.Ayar)
    var IsMotefaregheOrAbshode_0_1 =type
    var Count= faktorRow.count
    var Name_Sekeh=faktorRow.title
    var Sharh=faktorRow.title
    var query = [
        Sabte_Kol_Or_Movaghat_1_0, Moshtari_Code, Factor_Number, Radif_Number, 
        Shamsi_Year, Shamsi_Month, Shamsi_Day,
        Vazn, Ayar, Ang_Number, Name_az, BuyOrSale_0_1, 
        IsMotefaregheOrAbshode_0_1, Sharh
    ]
    var queryCoin = [
        Sabte_Kol_Or_Movaghat_1_0, Moshtari_Code, Factor_Number, Radif_Number, 
        Shamsi_Year, Shamsi_Month, Shamsi_Day,
        Vazn, Ayar, Count, Name_Sekeh, BuyOrSale_0_1, 
        Sharh
    ]
        var customerList = faktorRow.count?await GetTahHesab(
            {"DoNewSanadVKHSEKEH":queryCoin}
            ):await GetTahHesab(
            {"DoNewSanadVKHGOLD":query}
        )
    return({query,customerList,message:"outPut"})
}

module.exports =RegisterBuyKala