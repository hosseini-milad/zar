import { useState } from "react"
import QuickCounter from "./QuickCounter"
import QuickOff from "./QuickOff"
import QuickSearch from "./QuickSearch"
import env, { payValue,normalPriceCount } from "../../env"
import DataModal from "../../components/Modal/dataModal"

function QuickNew(props){
    const [selectedItem,setSelectedItem] = useState()
    const [count,setCount] = useState(1)
    const [discount,setDiscount] = useState(0)
    const [showDesc,setShowDesc] = useState(0)
    const [description,setDescription] = useState()
    const token = props.token
    const tab = props.tab
    const user=props.user
    //const [error,setError] = useState({message:'',color:"brown"})
    const addItem=()=>{
        if(!selectedItem)return
        props.setReload(0)
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({
                userId:user&&user._id,
                date:Date.now,
                price:selectedItem.price,
                sku:selectedItem.sku,
                count:count?count:1,
                
            })}
        fetch(env.siteApi + "/panel/faktor/add-cart",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error){
                    setTimeout(()=>props.setReload(1),500)
                    props.setError({message:result.error,color:"brown"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)
                }
                else{
                    setTimeout(()=>props.setReload(1),500)
                    
                    props.setCart(result)
                    props.setError({message:result.message,color:"green"})
                    setTimeout(()=>props.setError({message:'',
                        color:"brown"}),3000)
                        
                    //setItem('')
                    //setItemPrice('')
                    setCount("1")
                }
            },
            (error) => {
                console.log(error)
            })
    
    }
    const defAction=()=>{
        if(!selectedItem)return
        props.action({
                id:selectedItem.ItemID,
                sku:selectedItem.sku,
                title:selectedItem.title,
                count:count?count:1,
                price:selectedItem.priceData,
                description:"ویرایش شده"})
    }
    return(
        <tr className="input-tr">
            <td data-cell="ردیف"></td>
            
            <td className="search-td" data-cell="کد کالا">
                <QuickSearch data={props.data} setdata={props.setdata} token={token}
                search={props.search} setSearch={props.setSearch}
                setSelectedItem={setSelectedItem}/>
            </td>
            <td data-cell="شرح کالا">
                {selectedItem?selectedItem.title:''}<br/>
                <small>{selectedItem?selectedItem.sku:''}</small>
            </td>
            <td data-cell="وزن">
                {selectedItem?selectedItem.weight:''}
            </td>
            <td data-cell="مبلغ واحد">
                {selectedItem? 
                normalPriceCount(selectedItem.unitPrice):''}
            </td>
           
            <td data-cell="مبلغ کل">
                {selectedItem? 
                normalPriceCount(selectedItem.price):''}
            </td>
            <td>
            <div className="more-btn">
                <i className="fa-solid fa-comment"
                onClick={()=>setShowDesc(1)}></i>
                <i className="fa-solid fa-plus"
                onClick={props.action?
                defAction:addItem}></i>
            </div>
            {showDesc?<DataModal action={(e)=>setDescription(e)}
            close={()=>setShowDesc(0)} color="darkblue"
            buttonText="ثبت توضیحات" def={description} title={"افزودن توضیحات"}/>:
            <></>}
            </td>
        </tr>
    )
}
export default QuickNew