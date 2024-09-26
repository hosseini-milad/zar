const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title:  { type: String},
    sku: { type: String , unique: true},
    enTitle:String,
    weight:String,
    imageUrl: {
        type:String
    },
    thumbUrl: {
        type:String
    },
    isMojood:Boolean,
    price:String,
    categories:String
})
module.exports = mongoose.model('product',ProductSchema);