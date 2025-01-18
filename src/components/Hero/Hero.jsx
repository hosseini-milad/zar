import React from "react";
import Bg from "../../assets/Heros/LogoHeroBg.png";
import "./Hero.css";
export default function Hero() {
  return (
    <div className="Hero">
      <div
        className="Hero-container"
        style={{ backgroundImage: `url("${Bg}")` }}
      >
        <div className="logo-wrapper">
          <img src="/ZarLogoHero.svg" alt="Logo" />
        </div>
        <p className="fa-title">گالری جواهرات برزگر</p>
        <p className="en-title">Barzegar Jewelry Gallery</p>
      </div>
    </div>
  );
}
