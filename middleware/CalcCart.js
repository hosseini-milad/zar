const customers = require("../models/auth/customers");
const cart = require("../models/product/cart");
const faktor = require("../models/product/faktor");
const products = require("../models/product/products");
const FloatDec = require("./FloatDec");
const NormalNumber = require("./NormalNumber");
var ObjectID = require('mongodb').ObjectID;

const CalcCart=async(userId,remainRaw,manageId)=>{
    var totalWeight = 0
    var remain = remainRaw?remainRaw:0
    var totalPrice = 0
    var unitPrice = 0
    var goldUnit = []
    const cartDetails = await cart.find({userId:userId}).lean()
    for(var c=0;c<cartDetails.length;c++){
        unitPrice = cartDetails[c].unitPrice
        var cartPrice = parseFloat(cartDetails[c].price)
        if(cartDetails[c].purchase){
            totalPrice -= cartPrice
            totalWeight -= parseFloat(cartDetails[c].weight&&
                cartDetails[c].weight.replace(/\//g,'.'))
        } 
        else {
            var weight = parseFloat(cartDetails[c].weight&&
                cartDetails[c].weight.replace(/\//g,'.'))
            goldUnit.push({weight:weight,price:cartPrice})
            totalPrice += cartPrice 
            totalWeight += weight
        }
    }
    var faktorData = await faktor.aggregate([
        { $match: { manageId: manageId } },
        { $match: userId ? { userId: userId } : {} },
        { $sort: { "initDate": -1 } }
    ])
    return({cart:cartDetails,
        cartDetail: {
            "unitPrice": unitPrice,
            "cartDiscount": 0,
            "cartPrice": totalPrice,
            "cartWeight": FloatDec(totalWeight,2),
            "remainUser":remain,
            "finalGoldUnit":calcUnit(goldUnit),
            "finalPrice":totalPrice-remain
        },
        purchaseType:[
            {title:"خرید متفرقه",id:1,unitPrice:unitPrice,
                parameters:[
                    
                ]
            },
            {title:"خرید آبشده",id:2,unitPrice:unitPrice,
                parameters:[
                    {title:"نام آزمایشگاه",value:"lab",icon:"fa-cog",
                        options:["سعدی","حافظ","مولوی"]
                    },
                    {title:"شماره ری.انگ",value:"riang",icon:"fa-headphones",
                        options:[41,51,61,71,81,91]
                    }
                ]
            },
            {title:"سکه تمام بهار",id:10,unitPrice:unitPrice,
                ayar:"740",weight:"4.06",
                parameters:[
                    {title:"تعداد",value:"description",icon:"fa-comment",
                        options:[1,2,3,4,5,6,7,8,9,10]
                    }
                ]
            },
            {title:"سکه نیم بهار",id:11,unitPrice:unitPrice,
                ayar:"740",weight:"4.06",
                parameters:[
                    {title:"تعداد",value:"description",icon:"fa-comment",
                        options:[1,2,3,4,5,6,7,8,9,10]
                    }
                ]
            }
        ],
        faktorData
    })
}
const calcUnit=(goldArray)=>{
    if(!goldArray || !goldArray.length)return(0)
    var total = 0;
    var weight = 0
    for(var i=0; i<goldArray.length;i++){
        total += goldArray[i].price
        weight += goldArray[i].weight
    }
    return(NormalNumber(total/weight))
}
module.exports =CalcCart