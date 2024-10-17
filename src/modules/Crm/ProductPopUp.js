import { useEffect, useState } from "react"
import TaskMainPart from "./Tasks/TaskMainPart"
import env, { defPay } from "../../env"
import QuickCartHolder from "../../Order/QuickCart/QuickCartHolder"
import ShowError from "../../components/Modal/ShowError"
import TaskBtns from "./Tasks/TaskBtns"
import QuickRow from "../../Order/QuickCart/QuickRow"

function ProductPopUp(props){
    const data =props.data
    const token = props.token
    const [payValue,setPayValue] = useState(defPay)
    const [content,setContent] = useState()
    //console.log(content)
    const [error,setError] = useState({message:'',color:"brown"})
    console.log(data)
    
    
    
    return(
    <section className="delete-modal">
        <div className="modal-backdrop show-modal">
            <div className="task-popup fullPopUp">
                <div className="orderModalTitle">
                    {data.username} 
                    <sub>({data.phone})</sub>
                    <span> شماره سفارش: {data.faktorNo}</span>
                    <div className="address-status">
                         آدرس:  
                    {(props.customer&&props.customer[0])?
                        props.customer[0].Address:"-"} </div>
                    </div>
                <i className="fa fa-remove closeModal" 
                    onClick={props.close}></i>
                <div className="sharif" style={{padding: "70px 10px 10px"}}>
                    <main className="sharif-order-main">
                        <section className="admin-table-sec ">
                            <table>
                                <tbody>
                                    <tr>
                                        <th data-cell="ردیف"><p>ردیف</p></th>
                                        <th data-cell="شرح"><p>شرح</p></th>
                                        <th data-cell="عیار"><p>عیار</p></th>
                                        <th data-cell="وزن"><p>وزن</p></th>
                                        <th data-cell="مبلغ(ریال)"><p>ریال</p></th>
                                        </tr>
                                    {data?
                                    
                                        <QuickRow data={data}
                                        action={props.delete} setError={props.setError}
                                        token={props.token} user={props.user} setCart={props.setCart}
                                        cartNo={props.cartNo} canEdit={props.canEdit}/>
                                    :
                                    <div>{env.loader}</div>}
                                    
                                </tbody>
                            </table>
                        </section>
                    </main>
                </div>
            {props.access&&props.access==="edit"?
            <div className="crmAction">
                <TaskBtns content={content} token={token}
                data={props.data} setBoard={(e)=>props.setBoardArray(e)}
                close={props.close}/>
            </div>:<></>}
            </div>
            
        </div>
        {error&&error.message?
        <ShowError color={error.color} status={"مدیریت"} 
        text={error.message} />:<></>}
    </section>
    )
}
export default ProductPopUp