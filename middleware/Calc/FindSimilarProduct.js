const transaction = require("../../models/param/transaction")
const cart = require("../../models/product/cart")
const productSchema = require('../../models/product/products');
const StandardCompare = require("./StandardCompare");
const StandardText = require("./StandardText");

const FindSimilarProduct=async(productData)=>{
        var productTitle = productData.title&&productData.title.split(' ')
        var key1 = productTitle[0]
        var key2 = productTitle[1]
        var key3 = productTitle[2]?productTitle[2]:"گلد"
        var productData1 = await productSchema.find(
                {title:new RegExp('.*' + key1 + '.*')},
                {sku:1,title:1,imageUrl:1,thumbUrl:1,_id:0}).lean()
        productData1.forEach(obj => obj.index = 1); 
        var productData2 = await productSchema.find(
                {title:new RegExp('.*' + key2 + '.*')},
                {sku:1,title:1,imageUrl:1,thumbUrl:1,_id:0}).lean()
        productData2.forEach(obj => obj.index = 2);
        var productData3 = await productSchema.find(
                {title:new RegExp('.*' + key3 + '.*')},
                {sku:1,title:1,imageUrl:1,thumbUrl:1,_id:0}).lean()
        productData3.forEach(obj => obj.index = 3);
        var totalData = productData1.concat(
                productData2,productData3)
        const uniqueElements = [];

var duplicates = [{title:productData.title,
        sku:productData.sku,thumbUrl:productData.thumbUrl,
        imageUrl:productData.imageUrl}];

for(var i=0;i<totalData.length;i++){
        var item =totalData[i]
        var found =0
        for(var j=0;j<uniqueElements.length;j++){
                if(uniqueElements[j].title == item.title){
                        found = 1
                        if(uniqueElements[j].index == item.index) break
                        else {
                                var alreadyHas = StandardCompare(duplicates,
                                                item.title);
                                if(!alreadyHas){
                                uniqueElements.push(item);
                                duplicates.push({...item,index2:uniqueElements[j].index});
                                break
                                    }
                        }
                }
                
        }
        if(!found){
                uniqueElements.push(item);
        }
}
var finalDuplicate = []
if(uniqueElements&&uniqueElements.length>3){
        var dup1 = uniqueElements[1]
        if(!dup1.thumbUrl) dup1.thumbUrl="https://admin.barzegargold.com/upload/default/product.png"
        if(!dup1.imageUrl) dup1.imageUrl="https://admin.barzegargold.com/upload/default/product.png"
        var dup2 = uniqueElements[uniqueElements.length-1]
        if(!dup2.thumbUrl) dup2.thumbUrl="https://admin.barzegargold.com/upload/default/product.png"
        if(!dup2.imageUrl) dup2.imageUrl="https://admin.barzegargold.com/upload/default/product.png"
        
        finalDuplicate.push(dup1)
        finalDuplicate.push(dup2)
}
else
        finalDuplicate   = duplicates
return(finalDuplicate)
}

module.exports =FindSimilarProduct