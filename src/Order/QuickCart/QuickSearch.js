import { useEffect, useState } from "react"
import env,{findBox} from "../../env"
import CountCalculator from "./CountCalculator"

function SalesQuickSearch(props){
    const data = props.data
    const [showDrop,setShowDrop] = useState(0)
    const [query,setQuery] = useState('')
    useEffect(() => {
        const timeOutId = setTimeout(() => props.setSearch(query), 1000);
        return () => clearTimeout(timeOutId);
        //props.setSearch
      }, [query]);
    return(<>
        <div className="code-input-wrapper">
            <input 
            className="dp-input" 
            type="text" 
            placeholder="شرح کالا"
            onChange={(e)=>setQuery(e.target.value)}
            />
            <i className="fa-solid fa-angle-down"></i>
        </div>
        
        {query?
        <div className="code-drop-menu">
            {data?data.data&&data.data.map((item,i)=>(
                    <div
                        key={i}
                        className="menu-item"
                        onClick={(e)=>{
                        (props.setSelectedItem(item));
                        (setQuery(""))
                        }
                    }>
                        <div className="item-img">
                            <img src={env.siteApiUrl+item.imageUrl} alt=""/>
                        </div>
                        <div className="item-info">
                            <div className="item-p">
                                <p>{item.title}</p>
                            </div>
                            <div className="item-amount">
                                <p>{item.sku}</p>
                                <p>{item.weight}</p>
                                <p>{item.isMojood?"موجود":"ناموجود"}</p>
                            </div>
                        </div>
                    </div>
            
            )):<div className="roader">{env.loader}</div>}
        </div>:<></>}
    </>
    )
}
export default SalesQuickSearch