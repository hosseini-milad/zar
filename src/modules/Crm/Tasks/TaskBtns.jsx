import { useState,useEffect } from "react"
import ErrorAction from "../../../components/Modal/ErrorAction"
import ShowError from "../../../components/Modal/ShowError"
import env from "../../../env"
import CreatBtn from "../../../components/Button/CreatBtn"
function TaskBtns(props){
    const token = props.token
    const data = props.data
    const [showRemove,setShowRemove] = useState(0)
    const [Loader,setLoader] = useState(0)
    const [ShowAlert,setShowAlert] = useState(0)
    const [BtnObj,setBtnObj] = useState(0)
    const [TaskId,setTaskId] = useState("")
    const [Param,setParam]=useState()
    useEffect(() => {
        const postOptions = {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token && token.token,
            userId: token && token.userId,
          },
          body: JSON.stringify(),
        };
        console.log(postOptions);
        fetch(env.siteApi + `/panel/crm/faktor-get-status/${data._id}`, postOptions)
          .then((res) => res.json())
          .then(
            async (result) => {
                setBtnObj(result.buttons)
                setTaskId(result.taskData._id)

              }
            ,
            (error) => {
            
              console.log(error);
            }
          );
      }, []);
      console.log(BtnObj)
    const updateTask=(action)=>{
        setLoader(1)
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body:JSON.stringify({_id:data?data._id:'',
            status:action})
          }
      fetch(env.siteApi + "/panel/crm/update-tasks-status",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){

            }
            else{

                setTimeout(()=>props.close(),2000)
                props.setBoard(result.taskData)
                setShowAlert(result.message)
                setTimeout(()=>setShowAlert(0),2000)
                setLoader(0)
            }
        },
        (error) => {
          console.log(error);
        })
    }
    return(
        // <div className="taskAction">
        //     {Loader?
        //     <button
        //     type="button" 
        //     className="btn-crm btn-crm-accept"
        //     onClick={()=>updateTask("accept")}>
        //     <p>درحال پردازش</p>
        //     </button>:
        //             (data&&data.taskStep==="done"?
        //         <button type="button" className="btn-crm btn-crm-accept"
        //             onClick={()=>updateTask("sepidar")}><p>ثبت سپیدار</p></button>:
        //         <button type="button" className="btn-crm btn-crm-accept"
        //             onClick={()=>updateTask("accept")}>
        //             <p>تایید سفارش</p></button>)}
    
        //     <button type="button" className="btn-crm btn-crm-edit"
        //         onClick={()=>updateTask("edit")}>
        //         <p>اصلاح سفارش</p></button>
        //     <button type="button" className="btn-crm btn-crm-info"
        //         onClick={()=>window.location.href="/orders/print/"+data.orderNo}>
        //         <p>چاپ سفارش</p></button>
        //     {data&&data.taskStep==="done"||data.taskStep==="edit"?<button type="button" className="btn-crm btn-crm-cancel"
        //         onClick={()=>setShowRemove(data.orderNo)}>
        //         <p>لغو سفارش</p></button>:<></>}
        //     {data&&data.taskStep==="prepare"?
        //         <button type="button" className="btn-crm btn-crm-info"
        //         onClick={()=>window.location.href="/orders/invoice/"+data.orderNo}>
        //         <p>حواله خروج</p></button>:<></>}
        //     {showRemove?
        //         <ErrorAction status={"DELETE"} title={"لغو سفارش"} 
        //         text={"سفارش لغو خواهد شد. آیا مطمئن هستید؟"} linkText={""} style={{direction:"rtl"}}
        //         buttonText="حذف" close={()=>setShowRemove(0)}
        //         color="red" action={()=>deleteOrder(showRemove)}/>:
        //     <></>}
        //     {ShowAlert?<ShowError status={"SECCESS"} title={"Message"} 
        // text={ShowAlert} icon={"check-circle-o"} style={{direction:"rtl"}}
        // color="green"/>:<></>}
        // </div>
        <div className="taskAction">
            {BtnObj?BtnObj.map((Btn,i)=>(
                <CreatBtn content={Btn} key={i} token={token} Param={Param} setParam={setParam} TaskId={TaskId}/>
            )):<></>}
        </div>
    )
}
export default TaskBtns