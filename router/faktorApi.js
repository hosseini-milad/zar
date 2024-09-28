const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
var ObjectID = require('mongodb').ObjectID;
const auth = require("../middleware/auth");
const logger = require('../middleware/logger');
const productSchema = require('../models/product/products');
const productcounts = require('../models/product/productCount');
const category = require('../models/product/category');
const cart = require('../models/product/cart');
const qCart = require('../models/product/quickCart');
const FaktorSchema = require('../models/product/faktor');
const customerSchema = require('../models/auth/customers');
const sepidarPOST = require('../middleware/SepidarPost');
const productCount = require('../models/product/productCount');
const cartLog = require('../models/product/cartLog');
const users = require('../models/auth/users');
const quickCart = require('../models/product/quickCart');
const bankAccounts = require('../models/product/bankAccounts');
const sepidarFetch = require('../middleware/Sepidar');
const products = require('../models/product/products');
const tasks = require('../models/crm/tasks');
const CheckSale = require('../middleware/CheckSale')
const profiles = require('../models/auth/ProfileAccess');
const CreateTask = require('../middleware/CreateTask');
const NewCode = require('../middleware/NewCode');
const customers = require('../models/auth/customers');
const brand = require('../models/product/brand');
const FindCurrentCart = require('../middleware/CurrentCart');
const FindCurrentExist = require('../middleware/CurrentExist');
const OrderToTask = require('../middleware/OrderToTask');
const IsToday = require('../middleware/IsToday');
const NewQuote = require('../middleware/NewQuote');
const CreateCart = require('../middleware/CreateCart');
const CalcCart = require('../middleware/CalcCart');
const faktorItems = require('../models/product/faktorItems');
const faktor = require('../models/product/faktor');
const {TaxRate} = process.env

router.post('/products', async (req,res)=>{
    try{
        const allProducts = await productSchema.find()

        //logger.warn("main done")
        res.json({products:allProducts})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/list-product', async (req,res)=>{
    const filter = req.body.filters
    const brandId= filter?filter.brand:''
    const catId= filter?filter.category:''
    
    try{
        const products = await productSchema.find({})
        
        res.json({products:products})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/list-filters', async (req,res)=>{
    try{
        const brandData = await brand.find()
        const catData = await category.find({parent:{$exists:false}})
        for(var i =0;i<catData.length;i++){
            var subCat = await category.find(
                {"parent._id":(catData[i]._id).toString()})
            catData[i].children = subCat
        } 
        //logger.warn("main done")
        res.json({brands:brandData,cats:catData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/find-products',auth, async (req,res)=>{
    const search = req.body.search
        const userData = await users.findOne({_id:req.headers['userid']})
        const stockId = userData.StockId?userData.StockId:"13"
        var filter =''
        //if(userData.group === "bazaryab") filter = "fs"
        const searchProducts = await productSchema.
        aggregate([{$match:
            search?{$or:[
                {sku:{$regex: search, $options : 'i'}},
                {title:{$regex: search, $options : 'i'}}
            ]}:{sku:{$exists:true}}
        },
        filter?{$match:{sku:{$in:[/fs/i,/cr/i,/pr/i]}}}:
            {$match:{sku:{$exists:true}}},
        {$lookup:{
            from : "productprices", 
            localField: "ItemID", 
            foreignField: "ItemID", 
            as : "priceData"
        }},
        {$lookup:{
            from : "productcounts", 
            localField: "ItemID", 
            foreignField: "ItemID", 
            as : "countData"
        }}])
        try{
        var searchProductResult=[]
        const cartList = {}//await cart.find(stockId?{stockId:stockId,}:{})
        var currentCart = {}//await FindCurrentCart(cartList)
        const qCartList = {}//await qCart.find(stockId?{stockId:stockId}:{})
        var index = 0
        for(var i=0;i<searchProducts.length;i++){
            var count = (searchProducts[i].countData.find(item=>item.Stock==stockId))
            var count3 = (searchProducts[i].countData.find(item=>item.Stock=="9"))
            var desc = ''
            var cartCount = 0&&findCartCount(searchProducts[i].sku,currentCart.concat(qCartList),stockId)
            if(count)count.quantity = parseInt(count.quantity)-parseInt(cartCount)
            if((count&&(count.quantity>0))||(count3&&(count3.quantity>0))){
                index++
                desc=searchProducts[i].title+
                "("+searchProducts[i].sku+")"+
                "___"+(count&&count.quantity)
            
                searchProductResult.push({...searchProducts[i],
                    count:count,description:desc})
                if(index===15)break
            }
        }
            res.json({products:searchProductResult})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/calc-count',auth, async (req,res)=>{
    const userData = await users.findOne({_id:req.headers['userid']})
    const stockId = userData.StockId?userData.StockId:"13"
    const sku = req.body.sku
    if(!sku){
        res.status(400).json({message:"not found"})
        return
    }
    try{ 
    const searchProducts = await productSchema.aggregate([
        {$match:{sku:sku}},
        {$lookup:{
            from : "productprices", 
            localField: "ItemID", 
            foreignField: "ItemID", 
            as : "priceData"
        }},
        {$lookup:{
            from : "productcounts", 
            localField: "ItemID", 
            foreignField: "ItemID", 
            as : "countData"
        }}])
        const cartList = await tasks.find({taskStep:{$nin:['archive']}})
        var currentCart = await FindCurrentCart(cartList.map(item=>item.orderNo))
        console.log(stockId)
        const qCartList = await qCart.find(stockId?{stockId:stockId}:{})
        for(var i=0;i<searchProducts.length;i++){
            var count = searchProducts[i].countData.find(item=>(item.Stock==stockId))
            var count3 = searchProducts[i].countData.find(item=>(item.Stock=="9"))
            var desc = '' 
            count = count?count:0 
            count3 = count3?count3:0
            var cartCount = findCartCount(searchProducts[i].sku,currentCart.concat(qCartList),stockId)
            //console.log(cartCount)
            const storeCount =count?parseInt(count.quantity):0
            const orderCount =parseInt(cartCount)
            if(count||count3){ 
                if(count)
                    count.quantity = storeCount-orderCount
                else if(count3)
                    count3.quantity = count3.quantity-orderCount 
                res.json({count,storeCount,orderCount,count3:count3?count3.quantity:0,
                    perBox:searchProducts[i].perBox?searchProducts[i].perBox:0})
                return
            }
            else{
                res.json({count:0,storeCount,orderCount})
                return
            }
        }
            
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const findCartCount=(item,cart)=>{
    var cartCount =0
    for(var i=0;i<cart.length;i++){
        var cartItem =cart[i].cartItems 
        for(var c=0;c<(cartItem&&cartItem.length);c++){
            if(cartItem[c].sku === item){
                cartCount=parseInt(cartCount)+parseInt(cartItem[c].count)
            }
        }
    }
    return(cartCount)
    
}
router.post('/update-product',jsonParser,auth, async (req,res)=>{
    const data={
        title:req.body.title,
        sku:req.body.sku,
        date:Date.now()
    }
    try{
        var status = "";
        const searchProduct = await productSchema.findOne({sku:data.sku})
        if(!searchProduct){
            await productSchema.create(data)
            status = "new product"
        }
        else{
            await productSchema.updateOne(
                {sku:data.sku},{$set:data})
            status = "update product"
        }
        const allProducts = await productSchema.find()
        //logger.warn("main done")
        res.json({products:allProducts,status:status})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/categories', async (req,res)=>{
    try{
        const allCategories = await category.find()

        //logger.warn("main done")
        res.json({categories:allCategories})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/update-category',jsonParser,auth, async (req,res)=>{
    const data={
        title:req.body.title,
        parent:req.body.parent,
        body:req.body.body,
        date:Date.now()
    }
    try{
        var status = "";
        const searchCategory = await category.findOne({catCode:req.body.catCode})
        if(!searchCategory){
            await category.create(data)
            status = "new category"
        }
        else{
            await category.updateOne(
                {catCode:req.body.catCode},{$set:data})
            status = "update category"
        }
        const allCategory = await category.find()
        res.json({categories:allCategory,status:status})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/get-cart',auth, async (req,res)=>{
    const userId =req.body.userId
    try{ 
        const cartDetails = await CalcCart(req.headers['userid'])
        res.json(cartDetails)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/add-cart',auth,jsonParser, async (req,res)=>{
    const userId=req.headers['userid']
    if(!req.body.sku){
        res.status(400).json({error:"محصول وارد نشده است"})
        return
    }
    const data={
        userId:userId,
        sku:req.body.sku,
        count:req.body.count,
        date:req.body.date?req.body.date:Date.now(),
        progressDate:Date.now()
    }
    try{
        const userData = await users.findOne({_id:req.headers['userid']})
        const cartData = await cart.find({userId:userId})
        
        const cartItems = await CreateCart(cartData,data.sku,userId)
        if(cartItems.error){
            res.status(400).json({error:cartItems.error})
            return
        }
        else{
            const cart = await CalcCart(userId)
            res.json({cart,message:"آیتم اضافه شد"})
            return
        } 
        //const cartDetails = await findCartFunction(userId,req.headers['userid'])
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/remove-cart',auth,jsonParser, async (req,res)=>{
    const id=req.body.id
    const userId=req.headers['userid']
    if(!id){
        res.status(400).json({error:"ردیف وارد نشده است"})
        return
    }
    
    try{
        await cart.deleteOne({userId:userId,_id:ObjectID(id)})
        
        const cartDetail = await CalcCart(userId)
        res.json({cart:cartDetail,message:"آیتم حذف شد"})
        return
        //const cartDetails = await findCartFunction(userId,req.headers['userid'])
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/cart-to-faktor',auth,jsonParser, async (req,res)=>{
    const userId=req.headers['userid']
    
    try{
        const userData = await customers.findOne({_id:userId})
        const userCode = userData.phone&&userData.phone.substr(userData.phone.length - 4)
        const faktorNo = await NewCode("z"+userCode)
        const faktorData = {
            faktorNo:faktorNo,
            userId:userId,
            initDate:Date.now(),
            progressDate:Date.now(),
            status:"inprogress",
            isActive:true, isEdit:false,
            totalPrice:"12345000",
        }
        await faktor.create(faktorData)
        const cartDetail = await CalcCart(userId)
        for(var i=0;i<cartDetail.length;i++){
            var cartItem = cartDetail[i]
            const { _id: _, ...newObj } = cartItem;
            await faktorItems.create({...newObj,faktorNo:faktorNo})

        }
        await cart.deleteMany({userId:userId})
        res.json({faktorNo:faktorNo,message:"سفارش ثبت شد"})
        return
        //const cartDetails = await findCartFunction(userId,req.headers['userid'])
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/faktor', async (req,res)=>{
    const offset =req.body.offset?parseInt(req.body.offset):0 
    const userId =req.body.userId?req.body.userId:req.headers['userid'];
    try{
        const userDetail = await users.findOne({_id:req.headers['userid']})
        if(!userDetail){
            res.status(500).json({error: "access deny"})
            return
        }
        const access = userDetail.access
        const faktorTotalCount = await FaktorSchema.find(
            access==="manager"?{}:{manageId:userId}).count()
        const faktorList = await FaktorSchema.aggregate
        ([ {$match:access==="manager"?{}:{manageId:userId}},
        {$lookup:{
            from : "customers", 
            localField: "customerID", 
            foreignField: "CustomerID", 
            as : "userData"
        }},
        {$lookup:{
            from : "productcounts", 
            localField: "ItemID", 
            foreignField: "ItemID", 
            as : "countData"
        }},{$sort:{"initDate":-1}},
    {$skip:offset},{$limit:10}])
        //logger.warn("main done")
        res.json({faktor:faktorList,faktorCount:faktorTotalCount})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/faktor-find', async (req,res)=>{
    const faktorId =req.body.faktorId;
    try{
        const faktorData = await FaktorSchema.findOne({InvoiceID:faktorId})
        
        //logger.warn("main done")
        var userId=faktorData&&faktorData.manageId
        
        const OnlineFaktor = await sepidarFetch(data,"/api/invoices/"+faktorId,userId)
        const userDetail = await customerSchema.findOne({CustomerID:OnlineFaktor.CustomerRef})
        const invoice = OnlineFaktor.InvoiceItems
        if(!invoice)
            res.status(400).json({error: OnlineFaktor.Message})
        //var itemRefs=OnlineFaktor.InvoiceItems
        for(var i=0;i<invoice.length;i++){
            var faktorItem = invoice[i]
            var itemDetail = await products.findOne({ItemID:faktorItem.ItemRef})
            OnlineFaktor.InvoiceItems[i].itemDetail = itemDetail
            //itemRefs.push(faktorItem)
        }
        res.json({faktor:OnlineFaktor,userDetail:userDetail,itemRefs:invoice})
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})
router.post('/list-faktor',auth, async (req,res)=>{
    try{
        const faktorData = await FaktorSchema.find({}).lean()

        for(var i=0;i<faktorData.length;i++){
            var faktorNo = faktorData[i].faktorNo
            const faktorItemData = await faktorItems.find({faktorNo:faktorNo})
            faktorData[i].items = faktorItemData
            //itemRefs.push(faktorItem)
        }
        res.json({data:faktorData})
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})

router.post('/faktor-fetch', async (req,res)=>{
    const userId =req.body.userId?req.body.userId:req.headers['userid'];
    const faktorID=req.body.faktorID
    try{
        const faktorList = await FaktorSchema.aggregate
        ([
          {$match:{_id:ObjectID(faktorID)}},
        { $addFields: { "manageId": { "$toObjectId": "$manageId" }}},
        {$lookup:{
            from : "customers", 
            localField: "customerID", 
            foreignField: "CustomerID", 
            as : "userData"
        }},
        {$lookup:{
            from : "users", 
            localField: "userId", 
            foreignField: "_id", 
            as : "adminData"
        }},
        {$lookup:{
            from : "users", 
            localField: "manageId", 
            foreignField: "_id", 
            as : "managerData"
        }}])
        var faktorData = faktorList&&faktorList[0]
        var faktorDetail = ''
        if(faktorData){
            faktorDetail = (faktorData.userId +" "+ faktorData.manageId)
            if(faktorData.userId != faktorData.manageId){
            var userShow = await users.findOne({_id:ObjectID(faktorData.userId)})
            faktorList[0].userData[0] = userShow
            }
        }
        var orderData={cartPrice:0,cartCount:0}
        var cartPrice = 0
        var cartItems = (faktorList&&faktorList[0].faktorItems)?
            faktorList[0].faktorItems:[]
        for(var i = 0;i<cartItems.length;i++){
            cartPrice +=parseInt(cartItems[i].price)*
                cartItems[i].count
        }
        orderData.cartPrice=cartPrice
        
        res.json({faktor:faktorList,orderData:orderData,faktorDetail:faktorDetail})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/update-faktor',jsonParser, async (req,res)=>{
    const userId =req.body.userId?req.body.userId:req.headers['userid']
    const data={
        //
        manageId:req.headers['userid'],
        date:req.body.date,
        progressDate:Date.now() 
    }
    const cartID=req.body.cartID
    try{
        const cartList = await cart.aggregate
        ([{$match:{manageId:userId}},
            { $addFields: { "cartID": { "$toString": "$_id" }}},
            (cartID&&cartID.length)?{$match:{cartID:{$in:cartID}}}:{$match:{}},
            { $addFields: { "manageId": { "$toObjectId": "$manageId" }}},
            
        {$lookup:{
            from : "customers", 
            localField: "userId", 
            foreignField: "Code", 
            as : "userData"
        }},
        {$lookup:{
            from : "users", 
            localField: "manageId", 
            foreignField: "_id", 
            as : "adminData"
        }}])
        const faktorSeprate = totalCart(cartList)
        const faktorDetail = await IntegrateCarts(faktorSeprate)
        
        var sepidarQuery=[]
        var addFaktorResult=[]
        var faktorNo=0
        for(var i=0;i<faktorDetail.length;i++){
            faktorNo= await createfaktorNo("F","02","21")
            sepidarQuery[i] = await SepidarFunc(faktorDetail[i],faktorNo)
            //console.log(sepidarQuery[i])
            addFaktorResult[i] = await sepidarPOST(sepidarQuery[i],"/api/invoices",req.headers['userid'])
            //console.log(addFaktorResult[i])
            if(!addFaktorResult[i]||addFaktorResult[0].Message||!addFaktorResult[i].Number){
                res.status(400).json({error:addFaktorResult[0].Message?addFaktorResult[0].Message:"error occure",
                    query:sepidarQuery[i],status:"faktor"})
                return
            }
            else{
                const cartDetail =findCartSum(faktorDetail[i].cartItems)
                await FaktorSchema.create(
                    {...data,faktorItems:faktorDetail[i].cartItems,
                        userId:faktorDetail[i].userTemp,
                        customerID:faktorDetail[i].userId,
                        faktorNo:faktorNo,
                        totalPrice:cartDetail.totalPrice,
                        totalCount:cartDetail.totalCount,
                        InvoiceNumber:addFaktorResult[i].Number,
                        InvoiceID:addFaktorResult[i].InvoiceID})
                
            }
        }
        
        (cartID&&cartID.length)?await cart.deleteMany({_id:{$in:cartID}}):
        await cart.deleteMany({manageId:userId})

        const recieptQuery = 1//await RecieptFunc(req.body.receiptInfo,addFaktorResult[0],faktorNo)
        const recieptResult = 1//await sepidarPOST(recieptQuery,"/api/Receipts/BasedOnInvoice")
        //const SepidarFaktor = await SepidarFunc(faktorDetail)
        if(!recieptQuery||recieptResult.Message){
            res.json({error:recieptResult.Message,query:recieptQuery,status:"reciept"})
                return
        }
        else{
            res.json({recieptInfo:faktorDetail,
                users:users,
                faktorInfo:addFaktorResult,
                faktorData:sepidarQuery,
                status:"done"})
            }
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const IntegrateCarts = async(carts)=>{
    var cartList=carts
    for(var i =0 ;i<cartList.length;i++){
        cartList[i].cartItems= setCart(cartList[i].cartItems)
        
    }
    return(cartList)
}
const setCart=(cartItems)=>{
    var tempCart=[]
    for(var i=0;i<cartItems.length;i++){
        repeat = 0
        for(var j=0;j<tempCart.length;j++){
            if(cartItems[i].id===tempCart[j].id){
                tempCart[j].count=parseInt(tempCart[j].count)+
                                    parseInt(cartItems[i].count)
                repeat=1
                break
            }
        }
        !repeat&&tempCart.push({...cartItems[i]})
    }
    return(tempCart)
}
const SepidarFunc=async(data,faktorNo)=>{
    const notNullCartItem = []
    for(var i=0;i<data.cartItems.length;i++)
        data.cartItems[i].count?
        notNullCartItem.push(data.cartItems[i]):''
    //console.log(data)
    var query ={
        "GUID": "124ab075-fc79-417f-b8cf-2a"+faktorNo,
        "CustomerRef": toInt(data.userId),
        "AddressRef": toInt(data.userAddress)?toInt(data.userAddress):'',
        "CurrencyRef":1,
        "Description":faktorNo,
        "DescriptionRef":faktorNo,
        "SaleTypeRef": data.payValue?toInt(data.payValue):4,
        "Duty":0.0000,
        "Items": 
        notNullCartItem.map((item,i)=>(
            {
            "ItemRef": toInt(item.id),
            "TracingRef": null,
            "Description":item.description,
            "StockRef":"5",//data.stockId,
            "Quantity": toInt(item.count),
            "Fee": toInt(item.price),
            "Price": normalPriceCount(item.price,item.count,1),
            "Discount": findDiscount(item),
            "Tax": normalPriceCount(item.price,item.count,TaxRate),
            "Duty": 0.0000,
            "Addition": 0.0000
          }))
        
      }
    return(query)
}
const RecieptFunc=async(data,FaktorInfo,faktorNo)=>{
    var query ={
        "GUID": "124ab075-fc79-417f-b8cf-2a"+faktorNo,
        "InvoiceID": toInt(FaktorInfo.InvoiceID),
        "Description": toInt(FaktorInfo.Number),
        "Date":new Date(),
        "Drafts": 
          data.filter(n => n).map((pay,i)=>(
            {
            "BankAccountID": toInt(pay.id),
            "Description": pay.title,
            "Number": pay.Number?pay.Number:"000",
            "Date":new Date(),
            "Amount": toInt(pay.value)
          }))
        
      }
    return(query)
}
const updateCount = async(items)=>{
    for(var i=0;i<items.length;i++){
        await productCount.updateOne({ItemID:items[i].id,Stock:"13"},
            {$inc:{quantity:toInt(items[i].count,"1",-1)}})
    }
}
const returnUpdateCount = async(itemID,count)=>{
    await productCount.updateOne({ItemID:itemID,Stock:"13"},
        {$inc:{quantity:toInt(count)}})
    
}
const createfaktorNo= async(Noun,year,userCode)=>{
    var faktorNo = '';
    for(var i=0;i<10;i++){
        faktorNo = Noun+year+userCode+
        Math.floor(Math.random()* (99999 - 10000) + 10000)
        const findFaktor = await FaktorSchema.findOne({faktorNo:faktorNo})
        if(!findFaktor)
            return(faktorNo)
    }
}
const toInt=(strNum,count,align)=>{
    if(!strNum)return(0)
    
    return(parseInt(parseInt((align?"-":'')+strNum.toString().replace( /,/g, ''))*
    (count?parseFloat(count):1)))
}
const normalPriceCount=(priceText,count,tax)=>{
    if(!priceText||priceText === null||priceText === undefined) return("")
    var rawCount = parseFloat(count.toString())
    var rawTax = parseFloat(tax.toString())
    var rawPrice = Math.round(parseInt(priceText.toString().replace( /,/g, '')
        .replace(/\D/g,''))*rawCount*rawTax/1000)
    rawPrice = parseInt(rawPrice)*1000
    return(
      (rawPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace( /^\D+/g, ''))
    )
  }
const findDiscount=(item)=>{
    if(!item.discount) return(0.00)
    var off = Number(item.discount)
    var discount = off
    if(off<100){
        discount = Number(item.price) * Number(item.count) * discount/100
    }
    return(roundNumber(discount))
}
const roundNumber = (number)=>{
    var rawNumber = parseInt(number.toString().replace( /,/g, ''))
    return(parseInt(Math.round(rawNumber/1000))*1000)

}
const minusInt=(quantity,minus)=>{
    if(!quantity)return(0)
    
    return(parseInt(quantity.replace(/\D/g,''))-
    parseInt(minus.replace(/\D/g,'')))
}
const compareCount=(count1,count2)=>{
    return(parseInt(count1.toString().replace(/\D/g,''))>=
    (parseInt(count2.toString().replace(/\D/g,''))))
} 
router.post('/customer-find', async (req,res)=>{
    const search = req.body.search
    try{ 
        var searchCustomer = await users.
        aggregate([{$match:
            {$or:[
                {username:{$regex: search, $options : 'i'}},
                {Code:{$regex: search, $options : 'i'}}
            ]}
        }])
        //if(!searchCustomer.length){
        
        const searchUser = await customerSchema.
            aggregate([{$match:
                {$or:[
                    {username:{$regex: search, $options : 'i'}},
                    {Code:{$regex: search, $options : 'i'}}
                ]}
            }])
        //}
        const allUser = searchCustomer.concat(searchUser)  
        //logger.warn("main done")
        res.json({customers:allUser})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/bankCustomer', async (req,res)=>{
    const search = req.body.search
    try{ 
        var bankCustomer = await bankAccounts.find()
        
        res.json({bankList:bankCustomer})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/edit-addCart', async (req,res)=>{
    const cartNo=req.body.cartNo
    const data=req.body.data
    try{
        //const userData = await users.findOne({_id:req.headers['userid']})
        //const stockId = userData.StockId?userData.StockId:"13"
        var status = "";
        //const cartData = await cart.find({userId:userId})
        const CartData = await cart.findOne({cartNo:cartNo})
        
        const availItems = await checkAvailable(data,CartData.stockId)
        if(!availItems){
            res.status(400).json({error:"موجودی کافی نیست"}) 
            return
        }
        const cartItems = createCart(CartData?CartData.cartItems:[],
            data)
            CartData.cartItems =(cartItems)
        if(!CartData){
            
        }
        else{
            cartLog.create({...CartData,ItemID:data,action:"edit cart"})
            await cart.updateOne(
                {cartNo:cartNo},{$set:CartData})
            status = "edit cart"
        }
        const cartDetails = await findCartData(cartNo)
        res.json({...cartDetails,message:"آیتم اضافه شد"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/edit-removeCart',jsonParser, async (req,res)=>{
    const cartNo=req.body.cartNo
    const cartID=req.body.cartID
    
    try{
        var status = "";
        const cartData = await cart.findOne({cartNo:cartNo})
        const cartItems = removeCart(cartData,cartID)
        //cartData.cartItems =(cartItems)
        await cart.updateOne({cartNo:cartNo},
            {$set:{cartItems:cartItems}})
        //console.log(req.body.cartItem)
        cartLog.create({...cartData,ItemID:cartID,action:"edit delete"})
            
        const cartDetails = await findCartData(cartNo)
        res.json({...cartDetails,message:"آیتم حذف شد"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/edit-updateFaktor',jsonParser, async (req,res)=>{
    const data={
        //
        manageId:req.headers['userid'],
        date:req.body.date,
        progressDate:Date.now() 
    }
    const cartNo=req.body.cartNo
    try{
        const adminUser = await users.findOne({_id:ObjectID(req.headers["userid"])})
        
        if(!adminUser.access== "manager") {
            res.status(400).json({error:"no access"})
            return
        }
        const cartList = await cart.aggregate
        ([{$match:{cartNo:cartNo}},
            { $addFields: { "manageId": { "$toObjectId": "$manageId" }}},
            { $addFields: { "userId": { "$toObjectId": "$userId" }}},
            
        {$lookup:{
            from : "customers", 
            localField: "userId", 
            foreignField: "_id", 
            as : "userData"
        }},
        {$lookup:{
            from : "users", 
            localField: "manageId", 
            foreignField: "_id", 
            as : "adminData"
        }}])
        const faktorSeprate = totalCart(cartList)
        const faktorDetail = await IntegrateCarts(faktorSeprate)
        
        var sepidarQuery=[]
        var addFaktorResult=[]
        var faktorNo=0
        
        for(var i=0;i<faktorDetail.length;i++){
            faktorNo= await createfaktorNo("F","02","21")
            sepidarQuery[i] = await SepidarFunc(faktorDetail[i],faktorNo)
            
            addFaktorResult[i] = await sepidarPOST(sepidarQuery[i],"/api/invoices",req.headers['userid'])
            
            //console.log(addFaktorResult[i])
            if(!addFaktorResult[i]||addFaktorResult[0].Message||!addFaktorResult[i].Number){
                res.status(400).json({error:addFaktorResult[0].Message?addFaktorResult[0].Message:"error occure",
                    query:sepidarQuery[i],status:"faktor"})
                return
            }
            else{
                //console.log(addFaktorResult[i].Number)
                const cartDetail =findCartSum(faktorDetail[i].cartItems)
                await FaktorSchema.create(
                    {...data,faktorItems:faktorDetail[i].cartItems,
                        userId:faktorDetail[i].userTemp,
                        customerID:faktorDetail[i].userId,
                        faktorNo:faktorNo,
                        totalPrice:cartDetail.totalPrice,
                        totalCount:cartDetail.totalCount,
                        InvoiceNumber:addFaktorResult[i].Number,
                        InvoiceID:addFaktorResult[i].InvoiceID})
                
            }
        }
        
        await cart.deleteOne({cartNo:cartNo})
        

        const recieptQuery = 1//await RecieptFunc(req.body.receiptInfo,addFaktorResult[0],faktorNo)
        const recieptResult = 1//await sepidarPOST(recieptQuery,"/api/Receipts/BasedOnInvoice")
        //const SepidarFaktor = await SepidarFunc(faktorDetail)
        if(!recieptQuery||recieptResult.Message){
            res.json({error:recieptResult.Message,query:recieptQuery,status:"reciept"})
                return
        }
        else{
            res.json({recieptInfo:faktorDetail,
                users:users,
                faktorInfo:addFaktorResult,
                faktorData:sepidarQuery,
                status:"done"})
            }
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/edit-payValue',jsonParser, async (req,res)=>{
    const cartNo= req.body.cartNo;
    const data={
        userId:req.body.userId?req.body.userId:req.headers['userid'],
        payValue:req.body.payValue,
        date:req.body.date,
        progressDate:Date.now()
    }
    try{
        var status = "";
        cartNo?await cart.updateOne({cartNo:cartNo},{$set:{payValue:req.body.payValue}}):
            await quickCart.updateOne({userId:data.userId},{$set:data})
        status = "update cart"
        const cartDetails = cartNo?await findCartData(cartNo)
            :await findCartFunction(data.userId,req.headers['userid'])
        res.json({...cartDetails,message:"تغییرات ذخیره شد"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/sepidar-find',jsonParser, async (req,res)=>{
    const faktorId =req.body.faktorId;
    try{
        //const faktorData = await tasks.findOne({orderNo:cartId})
        //var faktorId = faktorData&&faktorData.result
        if(!faktorId){
            res.send({error:"not Found",message:"not found"})
            return
        }
        //logger.warn("main done")
        var userId=""
         
        const OnlineFaktor = await sepidarFetch("data","/api/invoices/"+faktorId) 
        
        const userDetail = await customerSchema.findOne({CustomerID:OnlineFaktor.CustomerRef,agent:{$exists:false}})
        const invoice = OnlineFaktor.InvoiceItems
        if(!invoice)
            res.status(400).json({error: OnlineFaktor.Message})
        //var itemRefs=OnlineFaktor.InvoiceItems
        for(var i=0;i<invoice.length;i++){
            var faktorItem = invoice[i]
            var itemDetail = await products.findOne({ItemID:faktorItem.ItemRef})
            OnlineFaktor.InvoiceItems[i].itemDetail = itemDetail
            //itemRefs.push(faktorItem)
        }
        res.json({faktor:OnlineFaktor,userDetail:userDetail,itemRefs:invoice})
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})
module.exports = router;