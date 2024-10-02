import React, { useRef ,useEffect, useState} from 'react';
import env from "../../../env"
import errortrans from "../../../translate/error"
import tabletrans from "../../../translate/tables"
import formtrans from "../../../translate/forms"
import NewsDetails from './NewsDetails';
import NewsImage from './NewsImage';
import ErrorAction from "../../PopUps/ErrorAction"
function NewsDetailHolder(props){
  const url = window.location.pathname.split('/')[3]
  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
  const lang = props.lang?props.lang.lang:errortrans.defaultLang;
  const [error,setError] = useState({errorText:'',errorColor:"brown"})
  const [content,setContent] = useState('')
  const [catChange,setCatChange] = useState('')
  const [Alert,setAlert]=useState(false)

  useEffect(()=>{
    if(url==="new")return
    var postOptions={
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({newsCode:url})
    }
   
fetch(env.siteApi + "/setting/fetch-news",postOptions)
.then(res => res.json())
.then(
  (result) => {
    if(result.error){
      setError({errorText:result.error,
        errorColor:"brown"})
      setTimeout(()=>setError({errorText:'',
        errorColor:"brown"}),3000)
    }
      else{
        setError({errorText:"سرویس پیدا شد",
          errorColor:"green"})
          setContent(result)
        setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
      }
      
  },
  (error) => {
    console.log(error);
  }
)
  },[])
  const saveNews=()=>{
    //if(newCustomer) {
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({newsCode:url,
            ...catChange})
        }
       //console.log(postOptions)
    fetch(env.siteApi + "/setting/update-news",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        if(result.error){
          setError({errorText:result.error,
            errorColor:"brown"})
          setTimeout(()=>setError({errorText:'',
            errorColor:"brown"}),3000)
        }
          else{
            setError({errorText:result.success,
              errorColor:"green"})
            setTimeout(()=>window.location.href="/news",2000)
          }
          
      },
      (error) => {
        console.log(error);
      }
    )
  }
  const deleteNews=()=>{
    //if(newCustomer) {
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({newsCode:url})
        }
       //console.log(postOptions)
    fetch(env.siteApi + "/setting/delete-news",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        if(result.error){
          setError({errorText:result.error,
            errorColor:"brown"})
          setTimeout(()=>setError({errorText:'',
            errorColor:"brown"}),3000)
        }
          else{
            setError({errorText:result.success,
              errorColor:"green"})
            setTimeout(()=>window.location.href="/news",2000)
          }
          
      },
      (error) => {
        console.log(error);
      }
    )
  }
console.log(content)
return(
  <div className="new-item" style={{direction:direction}}>
      <div className="create-product">
      <h4>افزودن خبر</h4>
      {content||url==="new"?<div className="pages-wrapper">
        <div className="item-box">
          <NewsDetails direction={direction} lang={lang} content={content}
            setCatChange={setCatChange} catChange={catChange}/>
          <NewsImage setCatChange={setCatChange} catChange={catChange} 
            lang={lang} content={content}/> 
          </div>
        <div className="create-btn-wrapper">
          <div className="save-btn delete-btn"  onClick={()=>setAlert(true)}>{formtrans.deleteNews[lang]}</div>
          <div className="save-btn" onClick={saveNews}>{formtrans.saveChanges[lang]}</div>
          <div className="cancel-btn" onClick={()=>window.location.href="/notification"}>{formtrans.cancel[lang]}</div>
        </div>
        
      </div>:<div>{env.loader}</div>}
    </div>
    {Alert?
    <ErrorAction 
    status={"DELETE"} 
    title={"حذف آیتم"} 
    text={"آیتم انتخاب شده حذف خواهد شد. آیا مطمئن هستید؟"} 
    linkText={""} 
    style={{direction:"rtl"}}
    buttonText="حذف" 
    close={()=>setAlert()}
    action={deleteNews}
    />:
    <></>}
  </div>
  )
}
export default NewsDetailHolder