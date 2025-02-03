const banks = require("../models/param/banks");

const NewBank=async(userNo)=>{
    var rxTemp = '';
    while(1){
        
        var foundRx = rxTemp&&await banks.findOne({code:rxTemp});
        if(rxTemp&&!foundRx)break
        else rxTemp=userNo+
            (Math.floor(Math.random() * 100) + 10)
    }
    return(rxTemp)

}
module.exports =NewBank