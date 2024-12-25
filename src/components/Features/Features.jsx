import React from "react";
import "./HomeComp.css"
export default function Features() {
  return (
    <div className="feature">
      <div className="container">
        <ul>
          <li>
            <i className="fa fa-truck"></i>
            <p> تضمین ارسال به موقع</p>
          </li>
          <li>
            <i className="fa fa-check"></i>
            <p> تضمین کیفیت کالا</p>
          </li>
          <li>
            <i className="fa fa-globe"></i>
            <p> شبکه ملی ارسال</p>
          </li>
          <li className="NoBorderL">
            <i className="fa fa-headphones"></i>
            <p> 24/7 پشتیبانی</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
