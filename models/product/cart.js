const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const CartSchema = new Schema({
    initDate: { type: Date, default: Date.now },
    progressDate: { type: Date },
    userId:{ type: String },
    description:{type:String},
    discount:{type:String},
    sku:{type:String},
    isMojood:{type:String},
    weight:{type:String},
    title:{type:String},
    price:{type:String},
    unitPrice:{type:String}
})
module.exports = mongoose.model('cart',CartSchema);