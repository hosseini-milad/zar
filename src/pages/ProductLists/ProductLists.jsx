import React from "react";
import { useParams } from "react-router";
import { NavList } from "../../components";
import { ProductList } from "../../containers";
export default function ProductLists() {
  let { cat, product } = useParams();
  const NavLists = [
    { title: "Home", link: "" },
    { title: cat, link: cat },
    { title: product, link: cat + "/" + product },
  ];
  return (
    <div>
      <NavList list={NavLists} />
      <ProductList PageName={product}/>
    </div>
  );
}
