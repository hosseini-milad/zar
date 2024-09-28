const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const FaktorItems = new Schema({
    faktorNo:{ type: String },
    initDate: { type: Date, default: Date.now },
    progressDate: { type: Date },
    sku:{ type: String },
    discount:{ type: String },
    price:{ type: String },
    totalPrice:{ type: String },
    weight:{ type: String },
    title:{ type: String },
    isMojood:{ type: Boolean }
})
module.exports = mongoose.model('faktorItems',FaktorItems);