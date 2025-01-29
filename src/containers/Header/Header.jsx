import React, { useState } from "react";
import "./Header.css";

import { Navbar } from "../../components";
export default function Header() {
  const NavList = [
    { title: "فروشگاه", link: "https://shop.barzegargold.com/" },
    { title: "درباره ما", link: "#about-us" },
    { title: "شعب ها", link: "#branches" },
    { title: "تماس با ما", link: "#contact-us" },
  ];
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-wrapper">
          <img src="/ZarLogoWhite.svg" alt="logo" />
        </div>
        <Navbar navList={NavList} />
      </div>
    </header>
  );
}
