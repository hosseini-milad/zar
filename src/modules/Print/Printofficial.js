import { useEffect, useState } from "react"
import env from "../../env"
import Cookies from 'universal-cookie';
import OfficialPrint from "./OfficialPrint";
const cookies = new Cookies();
const url = document.location.pathname.split('/')[3]
const type = document.location.pathname.split('/')[2]

const Printofficial = (props)=>{
    const [Content,setContent]=useState("")
    const [UserData,setUserData]=useState("")
    const token=cookies.get('zar-login')
    useEffect(()=>{
        //console.log(search)
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({faktorNo:url})
          }
        fetch(env.siteApi + "/panel/faktor/fetch-faktor",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                setContent(result)
                setUserData(result.userDetail)
            },
            (error) => {
                console.log(error)
            })
    },[])
    
    return(<>
        
        {Content?<div className="print-container">
            <OfficialPrint content={Content} user={UserData}/>
        </div>:<></>}
        </>
    )
}
export default Printofficial