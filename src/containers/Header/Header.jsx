import React from "react";
import "./Header.css";
export default function Header() {
  const NavList = [
    { title: "اشتراک ویژه", link: "#" },
    { title: "خریداران", link: "#" },
    { title: "محصولات", link: "/products" },
    { title: "فروشندگان", link: "#" },
    { title: "تولیدکنندگان", link: "#" },
    { title: "تماس با ما", link: "#" },
    { title: "راهنما", link: "#" },
    { title: "فارسی", link: "#" },
  ];
  return (
    <header className="header">
      <div className="container">
        <div className="wrapper logo-wrapper">
          <a href="/">
            <img src="/Logo.png" alt="Logo" />
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
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <div className="wrapper ul-wrapper">
          <div className="ul-item">
            <i className="fa-solid fa-circle-user"></i>
            <div className="p-wrapper">
              <p>
                <span className="hover">ورود</span>
                <span> / </span>
                <span className="hover">پیوستن</span>
              </p>
              <p>حساب کاربری</p>
            </div>
          </div>
          <div className="ul-item">
            <i className="fa-solid fa-envelope auto-hover"></i>
            <div className="p-wrapper">
              <p>
                <span className="auto-hover">اعلانات</span>
              </p>
              <p className="auto-hover">پیام ها</p>
            </div>
          </div>
        </div>
        <div className="wrapper mobile-wrapper">
          <i class="fa-solid fa-bars"></i>
          <div className="sub-menu">
            <ul>
              {NavList.map((nav, n) => (
                <li key={n} className="nav-item">
                  <a href={nav.link}>
                    <p>{nav.title}</p>
                  </a>
                </li>
              ))}
            </ul>
            <div className="wrapper ul-wrapper">
              <div className="ul-item">
                <i className="fa-solid fa-circle-user"></i>
                <div className="p-wrapper">
                  <p>
                    <span className="hover">ورود</span>
                    <span> / </span>
                    <span className="hover">پیوستن</span>
                  </p>
                  <p>حساب کاربری</p>
                </div>
              </div>
              <div className="ul-item">
                <i className="fa-solid fa-envelope auto-hover"></i>
                <div className="p-wrapper">
                  <p>
                    <span className="auto-hover">اعلانات</span>
                  </p>
                  <p className="auto-hover">پیام ها</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
