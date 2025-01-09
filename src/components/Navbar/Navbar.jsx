import React from "react";
import "./Navbar.css";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#">
              <p>اشتراک ویژه</p>
              <i></i>
            </a>
          </li>
          <li className="nav-item">
            <a href="#">
              <p>خریداران</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/products">
              <p>محصولات</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="#">
              <p>فروشندگان</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="#">
              <p>تولیدکنندگان</p>
            </a>
          </li>
        </ul>
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#">
              <p>تماس با ما</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="#">
              <p>راهنما</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="#">
              <p className="dropdown-btn">فارسی</p>
              
            </a>
            <div className="dropdown"></div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
