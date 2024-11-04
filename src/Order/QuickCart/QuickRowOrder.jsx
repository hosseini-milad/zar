import { useState } from "react"
import ErrorAction from "../../components/Modal/ErrorAction"
import env, { normalPriceCount, payValue ,normalPriceRound} from "../../env"
import DataModal from "../../components/Modal/dataModal"
import QuickOff from "./QuickOff"
import QuickCounter from "./QuickCounter"

function QuickRow(props){
    const data = props.data
    const token = props.token
    const user = props.user
    const tab = props.tab
    const [showDesc,setShowDesc] = useState(0)
    const [editMode,setEditMode] = useState(0)
    const [changes,setChanges]= useState()
    const [showRemove,setShowRemove] = useState()
    const updateField=(changes)=>{
        if(!changes) return
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({userId:user?user.Code?user.Code:
                user._id:(token&&token.userId),
                cartNo:props.cartNo,
                cartID:data.id,changes})
          }
          console.log(postOptions)
        fetch(env.siteApi + (props.cartNo?`/panel/${tab?"quote":"faktor"}/update-Item-cart`:
            `/panel/${tab?"quote":"faktor"}/update-Item`) ,postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error){
                    props.setError({message:result.error,color:"brown"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)
                    
                }
                else{
                    props.setCart(result) 
                    props.setError({message:result.message,color:"orange"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)
                        
                }
            },
            (error) => {
                console.log(error)
            })
    }
    
  
    const removeItem=()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({userId:user?user.Code?user.Code:
                user._id:(token&&token.userId),
                cartID:data.id})
          }
          console.log(postOptions)
        fetch(env.siteApi + `/panel/${tab?"quote":"faktor"}/remove-cart`,postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error){
                    props.setError({message:result.error,color:"brown"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)
                }
                else{
                    props.setCart(result) 
                    props.setError({message:result.message,color:"orange"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)

                }
            },
            (error) => {
                console.log(error)
            })
    }
    const defAction=()=>{
        props.action({cartID:data.id})
    }
    const saveChanges=()=>{
        updateField(changes)
        console.log(changes)
        setEditMode(0)
    }
    return(<>
        <tr className="product-tr">
            <td data-cell="ردیف">
            <p>{props.index}</p>
            </td>

            <td data-cell="کد کالا">
            <p>{data.sku}</p>
            </td>
            <td data-cell="شرح کالا">
            <div className="product-title">
                <p className="name">{data.title}</p>
            </div>
            </td>
            <td data-cell="وزن">
            <p>{data.weight+"g"}</p>
            </td>
            <td data-cell="مبلغ واحد">
            <p>{normalPriceCount(data.priceDetail.unitPrice)}</p>
            </td>
            
            <td data-cell="مبلغ کل">
            <p>{normalPriceCount(data.fullPrice)}</p>
            </td>
            <td>
            {editMode?<div className="more-btn">
                <i className="fa-solid fa-save"
                onClick={saveChanges}></i>
                <i className="fa-solid fa-remove"
                onClick={()=>setEditMode(0)}></i>
                </div>:
                <div className="more-btn">
                {props.canEdit?<i className="fa-solid fa-pen"
                onClick={()=>setEditMode(1)}></i>:<></>}
                <i className="fa-solid fa-comment"
                onClick={()=>setShowDesc(1)}></i>
                {/* {data.stock?<i className="fa-solid fa-sign-out storeSelect"
                onClick={()=>updateField({stock:""})}></i>:
                <i className="fa-solid fa-sign-out"
                    onClick={()=>updateField({stock:"9"})}></i>} */}
                <i className="fa-solid fa-trash" style={{color: "red"}}
                onClick={()=>setShowRemove(1)}></i>
            </div>}
            </td>
        </tr>
        {showRemove?
          <ErrorAction status={"DELETE"} title={"حذف آیتم"} 
            text={"آیتم انتخاب شده حذف خواهد شد. آیا مطمئن هستید؟"} linkText={""} style={{direction:"rtl"}}
            buttonText="حذف" close={()=>setShowRemove()}
            color="red" action={()=>props.action?defAction():removeItem()}/>:
          <></>}
          {showDesc?<DataModal action={
            (e)=>updateField({description:e})}
            close={()=>setShowDesc(0)} color="darkblue"
            buttonText="تغییر توضیحات" def={data.description} 
            title={"تغییر توضیحات"}/>:
            <></>}
        </>
    )
}
export default QuickRow