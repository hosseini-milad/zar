import React from "react";
import ring from "../../assets/Product/product-ring.png";
import neck from "../../assets/Product/product-neck.png";
import "./ProductPreset.css";
export default function ProductPreset() {
  return (
    <div className="ProductPreset">
      <div className="ProductPreset-container">
        <div className="wrapper">
          <img src={ring} alt="ring" />
          <p>انگشترهای دست ساز </p>
        </div>
        <div className="wrapper">
          <img src={neck} alt="neckless" />
          <p>گردنبندهای دست ساز </p>
        </div>
      </div>
    </div>
  );
}
