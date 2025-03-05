const customers = require("../models/auth/customers");
const sekke = require("../models/param/sekke");
const transactions = require("../models/param/transaction");
const cart = require("../models/product/cart");
const faktor = require("../models/product/faktor");
const faktorItems = require("../models/product/faktorItems");
const products = require("../models/product/products");
const FindRemainBank = require("./Calc/FindRemainBank");
const FloatDec = require("./FloatDec");
const NormalNumber = require("./NormalNumber");
var ObjectID = require('mongodb').ObjectID;

const UpdateCart=async(cartDetail)=>{
    
}
module.exports =UpdateCart