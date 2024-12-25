import React from "react";
import { CatCol, SlideCol, SetOrderCol } from "../../components";
import "./Hero.css"
export default function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <CatCol />
        <SlideCol />
        <SetOrderCol />
      </div>
    </div>
  );
}
