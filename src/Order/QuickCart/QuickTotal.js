import { useState,useEffect } from "react"
import env, { normalPriceCount, normalPriceRound } from "../../env"

function QuickTotal(props){
  const token = props.token
  const qCart = props.data
  const user = props.user
  const setShowBank=props.setShowBank
  const [First ,setFirst]=useState(1) 
  const [NeedToRe,setNeedToRe]=useState(false)
  
  //console.log(qCart)
  
  const [sec,setSec] = useState(0);
    useEffect(() => {
      
        if(sec<0){
          setSec(5*60*1000)
          
          setNeedToRe(true)
        }
        const interval = setInterval(() => {
            setSec(sec - 1000);
          }, 1000);
          return () => clearInterval(interval);
        
    }, [sec]);
    
    const msToTime=(milliseconds)=>{
        
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = seconds >= 60 ? minutes + 1 : minutes;
        minutes = minutes % 60;
        hours = hours % 24;
        return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    }
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
  
  const SetOrder=()=>{
    
      const postOptions={
          method:'post',
          headers: { 'Content-Type': 'application/json' ,
          "x-access-token": token&&token.token,
          "userId":token&&token.userId},
          body:JSON.stringify({userId:user&&user._id})
        }
        //console.log(postOptions)
      fetch(env.siteApi + "/panel/faktor/cart-to-faktor-sale",postOptions)
      .then(res => res.json())
      .then(
          (result) => {
              if(!result.error){
                  props.setError({message:result.message,color:"green"})
                  setTimeout(()=>props.setError({message:"",color:"brown"}),2000)
                  props.setCart(result)
                  setNeedToRe(true)
                  
              }
              else{
                props.setError({message:result.error,color:"brown"})
                  setTimeout(()=>props.setError({message:"",color:"brown"}),5000)
              }
                  
          },
          (error) => {
              console.log(error)
          })
  }
  const Recalc=()=>{
    
      const postOptions={
          method:'post',
          headers: { 'Content-Type': 'application/json' ,
          "x-access-token": token&&token.token,
          "userId":token&&token.userId},
          body:JSON.stringify({userId:user&&user._id})
        }
        //console.log(postOptions)
      fetch(env.siteApi + "/panel/faktor/recalc-cart",postOptions)
      .then(res => res.json())
      .then(
          (result) => {
              if(!result.error){
                  props.setError({message:result.message,color:"green"})
                  setTimeout(()=>props.setError({message:"",color:"brown"}),2000)
                  props.setCart(result)
                  setNeedToRe(false)
                  setShowBank(result.bankList)
              }
              else{
                props.setError({message:result.error,color:"brown"})
                  setTimeout(()=>props.setError({message:"",color:"brown"}),5000)
              }
                  
          },
          (error) => {
              console.log(error)
          })
  }
  const defAction=()=>{
    props.action({message:"acting"})
  }
  if(!qCart)
    return(<div className="total-amount"></div>)
  else return(
    <div className="total-amount">
      <div className="t-wrapper">
        <p>وزن کل</p>
        <p>{(qCart.cartWeight)}</p>
      </div>
      <div className="t-wrapper">
        <p>مبلغ واحد</p>
        <p>{normalPriceCount(qCart.unitPrice)}</p>
      </div>
      <div className="t-wrapper">
        <p>به ازای گرم</p>
        <p>{normalPriceCount(qCart.finalGoldUnit)||"-"}</p>
      </div>
      <div className="t-wrapper">
        <p>مالیات</p>
        <p>{normalPriceRound(qCart.totalTax)}</p>
      </div>
      <div className="t-wrapper">
        <p>مبلغ کل </p>
        <p>{normalPriceRound(qCart.cartPrice)}</p>
      </div>
      {
      NeedToRe?<button onClick={()=>{Recalc();setSec(5*60*1000);setNeedToRe(false)}} type="button" className="product-table-btn temp-btn">
      <p>محاسبه صورتحساب</p>
      </button>:<button type="button" className="product-table-btn temp-btn"
      >
        <p>{msToTime(sec)}</p>
      </button>}
    </div>
    )
}
export default QuickTotal