import React,{useState} from 'react'
import env from '../../env'
const CreatBtn = (props) => {
  const Param=props.Param
  const setParam=props.setParam
  const content = props.content
  const token = props.token
  const handleParam = (property, value) => {
    setParam((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };
  const updateTask=(value)=>{
    
    console.log(Param)
    const postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json',
        "x-access-token":token&&token.token,"userId":token&&token.userId},
        body:JSON.stringify({...Param,value,id:props.TaskId})
      }
      
  fetch(env.siteApi + "/panel/crm/update-faktor-tasks",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
        if(result.error){
          console.log(result.error)
        }
        else{

          console.log(result)
        }
    },
    (error) => {
      console.log(error);
    })
}
  return (
    <>
      {
        content.type=="text"?(
          <input 
          className="create-text" 
          style={{backgroundColor:content.color}}
          type={content.type} 
          placeholder={content.title} 
          onChange={(e) =>
            handleParam(content.parameter,e.target.value)
          }/>
        ):
        content.type=="button"?(
          <button 
          className="create-button"
          style={{backgroundColor:content.color}} 
          type={content.type} 
          onClick={()=>updateTask(content.value)}>
            {content.title}
          </button>
        )
      :<></>}
    </>
  )
}

export default CreatBtn
