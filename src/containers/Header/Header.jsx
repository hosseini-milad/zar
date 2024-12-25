import React from "react";
import "./Header.css";
export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="wrapper logo-wrapper">
          <a href="#">
            <img src="/Logo.svg" alt="Logo" />
          </a>
        </div>
        <div className="wrapper search-wrapper">
          <div className="search-box">
            <input type="search" placeholder="جستجو" />
            <select>
              <option value="products">محصولات</option>
              <option value="companies">شرکت ها</option>
              <option value="buyers">خریداران</option>
            </select>
            <button>
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <div className="wrapper ul-wrapper">
          <div className="ul-item">
            <i class="fa-solid fa-circle-user"></i>
            <div className="p-wrapper">
              <p>
                <span className="hover">ورود</span><span> / </span><span className="hover">پیوستن</span>
              </p>
              <p>حساب کاربری</p>
            </div>
          </div>
          <div className="ul-item">
            <i class="fa-solid fa-envelope auto-hover"></i>
            <div className="p-wrapper">
              <p>
                <span className="auto-hover">اعلانات</span>
              </p>
              <p className="auto-hover">پیام ها</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
