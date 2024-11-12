import { useState } from "react"
import { PriceDiscountTax, TAX, normalPriceCount, normalPriceRound } from "../../env"

function PreOrderItem(props){
    const data = props.data
    const total=props.total&&props.total[props.index]
    const [showDetail,setDetail] = useState(0)
    //console.log(data.userData)
    return(
        <div className="order-wrapper">
          <div className="border-title" 
            onClick={()=>showDetail?setDetail(0):setDetail(1)}>
            <div className="bu-name">
              {data.userDetail?<div className="col">
                <p>{data.userDetail?data.userDetail.username:'-'}</p>
                <span>{data.userDetail.phone?data.userDetail.phone:"----------"}
                  <i className="fa-solid fa-phone no-font" aria-hidden="true"></i>
                </span>
              </div>:<></>}
              {data.userDetail?<div className="col">
                <small >{data.userDetail?data.userDetail.Address:'-'}</small>
              </div>:<></>}
            </div>
            <div className="newCol">
              <p>شماره سفارش: {data.faktorNo}</p>
              <a className="orderNoCol" href={"/print/official/"+data.faktorNo}>
                چاپ سفارش</a>
            </div>
            <div className="newCol">
              <small>مبلغ کل:  <strong>{normalPriceRound(data.fullPrice)}</strong></small>
              <div className="col"><p>تعداد: {total?total.totalCount:1}</p></div>
            </div>
            <div className="newCol">
            <small>تاریخ: {new Date(data.progressDate)
                  .toLocaleDateString('fa')}</small>
            <small>ساعت: {new Date(data.progressDate)
                  .toLocaleTimeString('fa')}</small>
            </div>
            <div className="newCol">
              {data.description?<small>توضیحات: </small>:<></>}
              <small>{data.description}</small>
            </div>
            <i className={showDetail?"fa-solid fa-angle-up":
                "fa-solid fa-angle-down"}></i>
          </div>
          {showDetail?
          <div className=" admin-table-sec display-on height-on">
            <table>
              <thead>
                <tr>
                  <th data-cell="ردیف">
                    <p>ردیف</p>
                  </th>
                  <th data-cell="شرح کالا">
                    <p>شرح کالا</p>
                  </th>
                  
                  <th data-cell="واحد اصلی">
                    <p>واحد اصلی</p>
                  </th>
                  <th data-cell="مبلغ واحد">
                    <p>مبلغ واحد</p>
                  </th>
                  <th data-cell="تخفیف">
                    <p>تخفیف</p>
                  </th>
                  <th data-cell="مالیات">
                    <p>مالیات</p>
                  </th>
                  <th data-cell="مبلغ کل">
                    <p>مبلغ کل</p>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.items&&data.items.map((item,i)=>(
                        <tr className="product-tr product-info" key={i}>
                          <td  className="long-td">
                            <p className="name">{item.title}</p>
                          </td>
                          <td data-cell="کد کالا">
                              {item.purchase?<p>خرید</p>:<p>{item.sku}</p>}
                          </td>
                          <td data-cell="وزن">
                            <p>{item.weight+"g"}</p>
                          </td>
                          <td data-cell="عیار">
                            <p>{item.priceDetail&&item.priceDetail.Ayar}</p>
                          </td>
                          <td data-cell="مبلغ واحد">
                          <p>{normalPriceCount(item.unitPrice)}</p>
                          </td>
                          {item.purchase?<></>:<td data-cell="مبلغ به ازای هر گرم">
                          <p>{normalPriceCount(item.priceDetail&&item.priceDetail.unitGold)}</p>
                          </td>}
                          
                          <td data-cell="مبلغ کل" className={item.purchase?"long-td":""}>
                              <p>{normalPriceRound(item.fullPrice)}</p>
                          </td>
                    </tr>
            ))}
              </tbody>
            </table>

          </div>:<></>}
        </div>
    )
}
export default PreOrderItem