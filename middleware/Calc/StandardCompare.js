const StandardText = require("./StandardText")

const StandardCompare=(array,text)=>{
        if(!array||!array.length) return 0
        for(var i = 0;i<array.length;i++){
                if(StandardText(array[i].title) == 
                        StandardText(text)){
                        return(1)
                }
        }
        return(0)
}

module.exports =StandardCompare