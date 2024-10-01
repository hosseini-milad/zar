const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const FaktorItems = new Schema({
    faktorNo:{ type: String },
    initDate: { type: Date, default: Date.now },
    progressDate: { type: Date },
    sku:{ type: String },
    
    discount:{ type: String }, 
    price:{ type: String },
    unitPrice:{ type: String },
    fullPrice:{type:String},

    weight:{ type: String },
    title:{ type: String },

    isActive:{ type: Boolean },
    isEdit:{ type: Boolean },
    isMojood:{ type: Boolean },
    isReserve:{type:Boolean}
})
module.exports = mongoose.model('faktorItems',FaktorItems);