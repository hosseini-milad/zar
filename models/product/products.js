const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title:  { type: String},
    sku: { type: String , unique: true},
    enTitle:String,
    weight:String,
    imageUrl: {type:String},
    thumbUrl: {type:String},

    range:Array,
    rangeText:String,

    isMojood:Boolean,
    isReserve:{type:Boolean,default:false},
    sood:String,
    ojrat:String,
    
    price:String,
    poolSang:String, 
    categories:{type:Array,default:[]}
})
module.exports = mongoose.model('product',ProductSchema);