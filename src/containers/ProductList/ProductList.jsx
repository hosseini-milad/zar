import React from "react";
import "./ProductList.css";
import { ProductFilters, ProductListCard } from "../../containers";
import Al from "../../assets/products/al-honey.jpg";
export default function ProductList(props) {
  const { PageName } = props;
  const productLists = [
    {
      title: "3003 Aluminum honeycomb core for honeycomb panels",
      description:
        " Product Description The aluminium honeycomb core is composed and stacked by multi layer aluminium foil. It has even and smooth sur ",
      abillity: "10000 Piece/Pieces per Month",
      origin: "China",
      Location: "Jiangsu, China (Mainland)",
      img: Al,
      company: "Wuxi Shenxi Honeycomb Machinery Manufactory",
      type: "Manufacturer",
      key: "Honeycomb machinery, honeycomb core machine, honeycomb paperboard, honeycomb panel machine, honeycomb expander",
    },
    {
      title:
        "Advanced Construction Materials/ ACP ACM ACB PVDF/PE Coated Alucobond Price/Exterior Wall Aluminum Composite Panels",
      description:
        " Product Description The aluminium honeycomb core is composed and stacked by multi layer aluminium foil. It has even and smooth sur ",
      abillity: "10000 Piece/Pieces per Month",
      origin: "China",
      Location: "Jiangsu, China (Mainland)",
      img: Al,
      company: "Wuxi Shenxi Honeycomb Machinery Manufactory",
      type: "Manufacturer",
      key: "Honeycomb machinery, honeycomb core machine, honeycomb paperboard, honeycomb panel machine, honeycomb expander",
    },
    {
      title:
        "Eco-Friend Insulation Imitation Stone Exterior Decorative Aluminum Honeycomb Core Sandwich Panel",
      description:
        " Product Description The aluminium honeycomb core is composed and stacked by multi layer aluminium foil. It has even and smooth sur ",
      abillity: "10000 Piece/Pieces per Month",
      origin: "China",
      Location: "Jiangsu, China (Mainland)",
      img: Al,
      company: "Wuxi Shenxi Honeycomb Machinery Manufactory",
      type: "Manufacturer",
      key: "Honeycomb machinery, honeycomb core machine, honeycomb paperboard, honeycomb panel machine, honeycomb expander",
    },
  ];
  return (
    <div className="ProductList">
      <div className="ProductList-container">
        <div className="product-list-wrapper">
          <div className="title">
            <div className="text">
              <p>Showing List of</p>
              <span>{PageName}</span>
              <p>below</p>
            </div>
            <div className="num">
              <span>{productLists.length}+</span>
              <p>Products</p>
            </div>
            <div className="red-line"></div>
          </div>
          <div className="product-card-wrapper">
            {productLists.map((product, p) => (
              <ProductListCard key={p} data={product} />
            ))}
          </div>
        </div>
        <div className="product-filter-wrapper">
          <ProductFilters />
        </div>
      </div>
    </div>
  );
}
