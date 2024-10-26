import { useEffect, useState } from "react";
import env from "../../env";
import QuickActions from "./QuickActions"
import QuickTable from "./QuickTable"
import QuickTotal from "./QuickTotal"
import Cookies from 'universal-cookie';

function QuickCartHolder(props){
  const token = props.token
  const [search,setSearch] = useState()
  const [content,setContent] = useState()
  
    return(
    <section className="admin-table-sec ">
        <QuickTable data={content} token={token} canEdit={props.canEdit}
          cart={props.cart} setCart={props.setCart}
          user={props.user} action={props.addToCart}
          delete={props.deleteFromCart} setError={props.setError}
          search={search} setSearch={setSearch}
          cartNo={props.cartNo} payValue={props.payValue}/>
        <div className="product-table-btn-wrapper"> 
          <QuickActions cart={props.cart} setCart={props.setCart}
          action={props.addToCart} cartNo={props.cartNo}
          token={token} setError={props.setError} user={props.user}
          setPayValue={props.setPayValue} payValue={props.payValue}
          />
          <QuickTotal data={props.cartDetail} token={token}
          setCart={props.setCart} action={props.regCart}
            user={props.user} setError={props.setError}
            access={props.access}/>

        </div>

      </section>
    )
}
export default QuickCartHolder