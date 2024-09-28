const cart = require("../models/product/cart");
const products = require("../models/product/products");
const CalcPrice = require("./CalcPrice");
const FindPrice = require("./FindPrice");

const CreateCart=async(cartDetails,sku,userId)=>{
    var index = cartDetails.find(item=>item.sku==sku)
    if(!index){
        const productDetail = await products.findOne({sku:sku})
        if(!productDetail){
            return({error:"محصول پیدا نشد"})
        }
        
        const priceRaw = await FindPrice()
        const price = await CalcPrice(productDetail.weight,priceRaw)
        await cart.create({
            sku:sku,
            title:productDetail.title,
            weight:productDetail.weight,
            price:price,
            isMojood:productDetail.isMojood,
            userId:userId
        })
    }
    else{
        return({error:'محصول در سبد وجود دارد'})
    }
    return({message:"done"})
}

module.exports =CreateCart