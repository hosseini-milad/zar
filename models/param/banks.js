const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  title:{ type: String},
  enTitle:{ type: String},
  code:{type:String},
  description:{type:String},
  date:{type:Date,default:Date.now()}
});

module.exports = mongoose.model("bank", bankSchema);