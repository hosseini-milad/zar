import { useState } from "react"
import ErrorAction from "../../components/Modal/ErrorAction"
import env, { normalPriceCount, payValue } from "../../env"
import DataModal from "../../components/Modal/dataModal"
import QuickOff from "./QuickOff"
import QuickCounter from "./QuickCounter"

function QuickRow(props){
    const data = props.data
    console.log(data)
    
    return(<>
        <tr className="product-tr">
            <td data-cell="ردیف">
            <p>{props.index}</p>
            </td>
            <td data-cell="شرح">
            <div className="product-title">
                {/* <img src="/img/business/oil1.png" alt="avatar"/> */}
                <div className="product-name">
                <p className="name">{data.title}</p>

                </div>
            </div>
            </td>
            <td data-cell="عیار">
                <p>{data.count}</p>
            </td>
            <td data-cell="وزن">
            <p>{data.weight+"g"}</p>
            </td>
            <td data-cell="مبلغ کل">
            <p>{normalPriceCount(data.price)}</p>
            </td>
        </tr>
        
        
        </>
    )
}
export default QuickRow