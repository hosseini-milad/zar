import React from "react";
import "./footer.css";
import license1 from "../../assets/license/image 8.svg";
import license2 from "../../assets/license/image 9.svg";
import license3 from "../../assets/license/image 10.svg";
import instagram from "../../assets/Media/instagram.svg";
import linkden from "../../assets/Media/linkden.svg";
import whatsapp from "../../assets/Media/whatsapp.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="wrapper">
          <div className="col">
            <p className="title">مجوز ها</p>
            <div className="image-wrapper">
              <img src={license1} alt={license1} />
              <img src={license2} alt={license2} />
              <img src={license3} alt={license3} />
            </div>
          </div>
          <div className="col">
            <p className="title">شبکه های مجازی</p>
            <div className="image-wrapper">
              <img src={instagram} alt={instagram} />
              <img src={linkden} alt={linkden} />
              <img src={whatsapp} alt={whatsapp} />
            </div>
          </div>
          <div className="col">
            <p className="title">راه های ارتباطی</p>
            <div className="p-wrapper">
              <p>02128282828</p>
              <p>info@barzegar.com</p>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>کلیه حقوق برای فروشگاه برزگر محفوظ است </p>
          <a href="https://dkmehr.com/">
            <p>طراحی سایت : شرکت داده کاوان</p>
          </a>
        </div>
      </div>
    </footer>
  );
}
