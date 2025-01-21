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
          <img src="/ZarLogoHero.PNG" alt="Logo" />
        </div>
        
      </div>
    </div>
  );
}
