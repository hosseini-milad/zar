const { default: fetch } = require("node-fetch");
const https = require("https");
const { TAH_HESAB_URL,TAH_HESAB_TOKEN} = process.env;

const GetTahHesab=async(body)=>{
    var header = {"Authorization":TAH_HESAB_TOKEN,"Content-Type":"application/json"}
    
    var response = ''; 
    const agent = new https.Agent({
        rejectUnauthorized: false 
    })
    try{   response = await fetch(TAH_HESAB_URL,
            {method: 'POST' ,headers:header, agent,
        body:JSON.stringify(body)});
        const result = await response.json();
        
         return(result)
    } 
    catch(error){
        console.log("error: ",error) 
        return({error:error})
    }
}

module.exports =GetTahHesab