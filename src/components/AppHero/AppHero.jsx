import React from "react";
import "./AppHero.css";
import DlBg from "../../assets/Heros/DlHeroBg.png";
import Mobile from "../../assets/Heros/Mobile.svg";
export default function AppHero() {
  return (
    <div className="AppHero">
      <div
        className="AppHero-container"
        style={{ backgroundImage: `url("${DlBg}")` }}
      >
        <div className="wrapper">
          <div className="title">
            <p>فروشگاه آنلاین</p>
            <p>محصولات برزگر</p>
            <p>به راحتی خرید کنید</p>
          </div>
          <button>ورود به برنامه</button>
          <a href="#">دانلود مستقیم اپلیکیشن</a>
        </div>
        <div
          className="image-wrapper"
          style={{ backgroundImage: `url("${Mobile}")` }}
        ></div>
      </div>
    </div>
  );
}
