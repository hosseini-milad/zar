const products = require("../models/product/products");

const CreateCart=async(cartDetails,sku,userId)=>{
    var newCar =[]
    var index = cartDetails.find(item=>item.sku==sku)
    if(!index){
        const productDetail = await products.findOne({sku:sku})
        cartDetails.push({
            sku:sku,
            title:productDetail.title,
            weight:productDetail.weight,
            price:productDetail.price,
            isMojood:productDetail.isMojood,
            userId:userId
        })
    }
    else{
        return('repeated Item')
    }
    for(var c=0;c<cartDetails.length;c++){
        if(cartDetails[c].sku == sku){

        }
    }
    return({totalPrice:totalPrice,totalCount:totalCount})
}

module.exports =CreateCart