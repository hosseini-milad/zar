import React from "react";
import { useEffect, useState } from "react";
import "./AppHero.css";
import DlBg from "../../assets/Heros/DlHeroBg.png";
import Mobile from "../../assets/Heros/Mobile.svg";
import MobileViewBg1 from "../../assets/Heros/MobileAppBg-1.png";
import MobileViewBg2 from "../../assets/Heros/MobileAppBg-2.png";
export default function AppHero() {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 750);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="AppHero">
      <div
        className="AppHero-container"
        style={{ backgroundImage: isMobileView ? `url("${DlBg}")` : "none" }}
      >
        <div
          className="wrapper"
          style={{
            backgroundImage: isMobileView ? `url("${MobileViewBg2}")` : "none",
          }}
        >
          <div className="title">
            <p>فروشگاه آنلاین</p>
            <p>محصولات برزگر</p>
            <p>به راحتی خرید کنید</p>
          </div>
          <button onClick={() => window.open("https://shop.barzegargold.com/")}>
            ورود به برنامه
          </button>
          <a href="#">دانلود مستقیم اپلیکیشن</a>
        </div>
        <div
          className="mobile-image"
          style={{
            backgroundImage: isMobileView ? `url("${MobileViewBg1}")` : "none",
          }}
        >
          <div
            className="image-wrapper"
            style={{ backgroundImage: `url("${Mobile}")` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
