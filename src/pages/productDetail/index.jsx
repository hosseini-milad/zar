import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Footer from '../../components/Footer';
const ProductDetail = () => {
  let { pathname } = useLocation();
  const productId = pathname.split("/")[2]
  console.log(productId)
  return (
    <div>
      <Footer/>
    </div>
  )
}

export default ProductDetail
