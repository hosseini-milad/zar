const express = require('express');
const router = express.Router()
const { default: fetch } = require("node-fetch");
var ObjectID = require('mongodb').ObjectID;
const auth = require("../middleware/auth");
const slider = require('../models/main/slider');
const authApi = require('./authApi');
const taskApi = require('./taskApi');
const yasApi = require('./yasApi');
const appApi = require('./appApi');
const cartApi= require('./cartApi');
const settingApi = require('./settingApi');
const productApi = require('./productApi');
const formApi = require('./formApi');
const paymentApi = require('./paymentApi');
const userApi = require('./userApi');
const panelUserApi = require('./panelUserApi')
const CRMPanelApi = require('./panelCrmApi')
const panelOrderApi = require('./panelOrderApi')
const panelProductApi = require('./panelProductApi')
const panelFaktorApi = require('./faktorApi')
const sepidarFetch = require('../middleware/Sepidar');
const products = require('../models/product/products');
const productPrice = require('../models/product/productPrice');
const productCount = require('../models/product/productCount');
const customers = require('../models/auth/customers');
const schedule = require('node-schedule');
const bankAccounts = require('../models/product/bankAccounts');
const updateLog = require('../models/product/updateLog');
const state = require('../models/main/state');
const city = require('../models/main/city');
const quickCart = require('../models/product/quickCart');
const GetTahHesab = require('../middleware/GetTahHesab');
const price = require('../models/price');
const NewBank = require('../middleware/NewBank');
const banks = require('../models/param/banks');
const sekke = require('../models/param/sekke');
const { ONLINE_URL} = process.env;
 
router.get('/main', async (req,res)=>{
    try{
        const sliders = await slider.find()

        //logger.warn("main done")
        res.json({sliders:sliders})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.use('/auth', authApi)
router.use('/task', taskApi)
router.use('/setting', settingApi)
router.use('/app', appApi)
router.use('/cart', cartApi)
router.use('/product', productApi)
router.use('/form', formApi)
router.use('/user', userApi)
router.use('/payment',paymentApi)

router.use('/yas', yasApi)
router.use('/panel/user', panelUserApi)
router.use('/panel/order', panelOrderApi)
router.use('/panel/product', panelProductApi)
router.use('/panel/faktor', panelFaktorApi)
router.use('/esale', panelFaktorApi)

router.use('/panel/crm',CRMPanelApi)

 schedule.scheduleJob('*/2 * * * *', async() => { 
    try{
    var response = await fetch(process.env.ONLINE_PRICE,{method: 'GET'})
    const result = await response.json();
    var priceValue = result&&result.YekGram18
    priceValue&&await price.create({price:priceValue,date:Date.now()});
    }
    catch(error){
        console.log(error)
    }
 })
 schedule.scheduleJob('*/10 * * * *', async() => { 
    try{
        var response = await fetch(ONLINE_URL + "/get-product",
        { method: 'POST' });
        
        var response = await fetch(ONLINE_URL + "/get-customers",
            { method: 'POST' });
    }catch{}
 })
 router.get('/get-customers', async (req,res)=>{
    try{
        const result =[]
        for(var i=0;i<20;i++){
            result.push(await updateCustomer(i*500,(i+1)*500))
        }

        await updateLog.create({date:Date.now(),updateQuery:"customers"})
        res.json({result})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/get-product', async (req,res)=>{
    try{
        const result =[]
        for(var i=0;i<20;i++){
            console.log("updating: "+i*500+" to "+ (i+1)*500)
            result.push(await updateProduct(i*500,(i+1)*500))
        }
        await updateLog.create({date:Date.now(),updateQuery:"products"})
        res.json({result})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/get-banks', async (req,res)=>{
    try{
        const result =[]
        const bankList = await GetTahHesab(
            {
                "DoListHesabBanki":[]
            }
        )
        for(var i=0;i<bankList.length;i++){
            var bankData = bankList[i]
            var exists = await banks.findOne({title:bankData.Name_Bank})
            if(!exists){
                await banks.create({
                    title:bankData.Name_Bank,
                    code:await NewBank("B")
                })
            }
        }
        res.json(bankList)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/get-sekke', async (req,res)=>{
    try{
        const result =[]
        const sekkeList = await GetTahHesab(
            {
                "DoListNameSekeh":[]
            }
        )
        for(var i=0;i<sekkeList.length;i++){
            var sekkeData = sekkeList[i]
            var exists = await sekke.findOne({title:sekkeData.Name})
            if(!exists){
                await sekke.create({
                    title:sekkeData.Name,
                    weight:sekkeData.Vazn,
                    Ayar:sekkeData.Ayar,
                })
            }
        }
        res.json(sekkeList)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

const updateProduct=async(from,to)=>{
    const productList = await GetTahHesab(
        {
            "DoListEtiket":
            [from,to]
        }
    )
    
    var outPut = []
    var updateProduct = 0
    var newProduct = 0
    var skuList = []
    for(var i=from;i<to;i++){
        if(productList[i]){
        var sku = Number(productList[i].Code)
        skuList.push(sku)
        var newSood = Number(productList[i].DarsadVazn)
        /*if(sku>400)
            newSood -=3*/
        var query = {title:productList[i].Name,
            sku:productList[i].Code,
            weight:productList[i].Vazn,
            size:NormalNum(productList[i].Size),
            color:productList[i].Color,
            colorCode:ColorCode(productList[i].ColorCode),
            ayar:productList[i].Ayar,
            sharh:productList[i].Sharh,
            sood:productList[i].DarsadSood,
            poolSang:productList[i].PoolSang,
            ojrat:newSood,
            isMojood:productList[i].IsMojood=="1"?true:false,
            }
        var updateResult = await products.updateOne({sku:productList[i].Code},
            {$set:query}
        )
        if(!updateResult.matchedCount){
            newProduct++
            await products.create(query)
        }
        if(updateResult.modifiedCount){
            updateProduct++
        }
        }
    }
    return({updateProduct, newProduct})
}
const updateCustomer=async(from,to)=>{
    try{
        const customerList = await GetTahHesab(
            {
                "DoListMoshtari":
                [from,to]
            }
        )
        var outPut = []
        var updateCustomer = 0
        var newCustomer = 0
        for(var i=from;i<to;i++){
            if(customerList[i]){
            outPut.push(customerList[i])
            var query = {username:customerList[i].Name,
                phone:customerList[i].Mobile,
                groupCode:customerList[i].GID,
                cCode:i, 
                birthDay:customerList[i].BDate,
                city:customerList[i].City,
                Address:customerList[i].Address,
                meliCode:customerList[i].CodeMelli,
                group:customerList[i].GoroupName}
            var updateResult = await customers.updateOne({phone:customerList[i].Mobile},
                {$set:query}
            )
            if(!updateResult.matchedCount){
                newCustomer++
                await customers.create(query)
            }
            if(updateResult.modifiedCount){
                updateCustomer++
            }
        }
    }
    return({updateProduct, newCustomer})
    }
    catch{}
}
router.get('/update-log', async (req,res)=>{
    try{ 
        const userData = await users.findOne({_id:ObjectID(req.headers['userid'])})
        if(!userData){
            res.status(400).json({error:"error not found"})
            return
        }
        const productLog = await updateLog.find({updateQuery:"products"}).sort({ "date": -1 }).limit(5)
        const customerLog = await updateLog.find({updateQuery:"customers"}).sort({ "date": -1 }).limit(5)

        const sepidarLog = await updateLog.find({}).sort({ "date": -1 }).limit(20)

        res.json({ log: sepidarLog,
            productLog,customerLog,
             message: "done" })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const NormalNum = (data)=>{
    if(!data) return("0")
    var result = data.replace(/\D/g,'')
    return(result)
}
const ColorCode = (color)=>{
    if(!color) return("#eee")
    var result = "#eee"
    return(result)
}


module.exports = router;