import React from "react";
import "./AllCategory.css";
import { CatCard } from "../../components";
import CatImg from "../../assets/products/CatCard-1.webp";
export default function AllCategory() {
  const CatList = [
    {
      img: CatImg,
      title: "Minerals",
      list: ["Wire Mesh", "Aluminum", "Titanium"],
    },
    {
      img: CatImg,
      title: "Chemicals",
      list: ["Wire Mesh", "Aluminum", "Titanium"],
    },
    {
      img: CatImg,
      title: "Beauty & Personal",
      list: ["Wire Mesh", "Aluminum", "Titanium"],
    },
    {
      img: CatImg,
      title: "Security",
      list: ["Wire Mesh", "Aluminum", "Titanium"],
    },
    {
      img: CatImg,
      title: "Luggage, Bags",
      list: ["Wire Mesh", "Aluminum", "Titanium"],
    },
    {
      img: CatImg,
      title: "Machinery",
      list: ["Wire Mesh", "Aluminum", "Titanium"],
    },
  ];
  return (
    <div className="AllCategory">
      <div className="AllCategory-container">
        <div className="title">
          <p>All Categories</p>
          <span className="red-line"></span>
        </div>
        <div className="cat-wrapper">
          {CatList.map((cat, c) => (
            <CatCard key={c} item={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}
