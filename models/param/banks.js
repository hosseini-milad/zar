const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  title:{ type: String,unique:true},
  enTitle:{ type: String},
  payValue:{type:String},
  orderNo:{type:String},
  userId:{type:String},
  code:{type:String},
  active:{type:Boolean,default:false},
  description:{type:String},
  date:{type:Date,default:Date.now()}
});

module.exports = mongoose.model("bank", bankSchema);