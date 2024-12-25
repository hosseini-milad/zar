import React from "react";
import "./TwinSlide.css";
import IdSlide from "./IdSlide";
import Slide11 from "../../assets/TwinSlide/Tslide-1-1.webp";
import Slide12 from "../../assets/TwinSlide/Tslide-1-2.jpeg";
import Slide21 from "../../assets/TwinSlide/Tslide-2-1.webp";
import Slide22 from "../../assets/TwinSlide/Tslide-2-2.webp";
export default function TwinSlide() {
  const PicList1=[Slide11,Slide12]
  const PicList2=[Slide21,Slide22]
  return (
    <div className="TwinSlide">
      <div className="container">
        <IdSlide Pic={PicList1}/>
        <IdSlide Pic={PicList2}/>
      </div>
    </div>
  );
}
