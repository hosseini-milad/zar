const express = require('express');
const router = express.Router()
const { default: fetch } = require("node-fetch");
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
router.use('/esale', panelFaktorApi)

router.use('/panel/crm',CRMPanelApi)
schedule.scheduleJob('5 */2 * * *', async() => { 
    response = await fetch(ONLINE_URL+"/get-customers",
        {method: 'GET'});
 })
 router.get('/get-customers', async (req,res)=>{
    try{
        const customerList = await GetTahHesab(
            {
                "DoListMoshtari":
                [1,16]
            }
        )
        var outPut = []
        var updateCustomer = 0
        var newCustomer = 0
        for(var i=1;i<1000;i++){
            if(customerList[i]){
            outPut.push(customerList[i])
            var query = {username:customerList[i].Name,
                phone:customerList[i].Mobile,
                groupCode:customerList[i].GID,
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
        res.json({updateCustomer,newCustomer})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/get-product', async (req,res)=>{
    try{
        const productList = await GetTahHesab(
            {
                "DoListEtiket":
                [1,1000]
            }
        )
        var outPut = []
        var updateProduct = 0
        var newProduct = 0
        for(var i=1;i<1000;i++){
            if(productList[i]){
            outPut.push(productList[i])
            var query = {title:productList[i].Name,
                sku:productList[i].Code,
                weight:productList[i].Vazn,
                isMojood:productList[i].IsMojood=="1"?true:false,
                price:productList[i].OnlinePrice}
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
        res.json({updateProduct,newProduct})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/sepidar-update-log', async (req,res)=>{
    try{ 
        const sepidarLog = await updateLog.find({}).sort({"date":-1})
        
        res.json({log:sepidarLog,message:"done"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;