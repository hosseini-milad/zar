import React, { useState } from "react";
import "./Header.css";

import { Navbar } from "../../components";
export default function Header() {
  const NavList = [
    { title: "فروشگاه", link: "#" },
    { title: "درباره ما", link: "#" },
    { title: "شعب ها", link: "#" },
    { title: "تماس با ما", link: "#" },
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
