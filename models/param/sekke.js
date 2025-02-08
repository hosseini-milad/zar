const mongoose = require("mongoose");

const sekkeSchema = new mongoose.Schema({
  title:{ type: String,unique:true},
  weight:{type:String},
  Ayar:{type:String},
  active:{type:Boolean,default:true},
  date:{type:Date,default:Date.now()}
});

module.exports = mongoose.model("sekke", sekkeSchema);