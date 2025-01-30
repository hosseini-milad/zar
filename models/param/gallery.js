const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: { type: String, unique:true},
  gCode:{type:String, unique:true},
  content: { type: String},
  manageId: {type:String},
  manageEdit: {type:String},
  active:{type:Boolean},
  imageUrl: { type: String},
  thumbUrl: { type: String},
  sort:{type:Number},
  productList: {type:Array},
  date:{type:Date,default:Date.now()}
}); 

module.exports = mongoose.model("gallery", gallerySchema);