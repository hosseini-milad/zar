import React, { useState } from "react";
import "./Navbar.css";
export default function Navbar(props) {
  const [HamMenu, setHamMenu] = useState(0);
  const { navList } = props;
  return (
    <nav className="navbar">
      <div className="container">
        <ul className={HamMenu ? "active-list" : ""}>
          {navList.map((item, i) => (
            <li key={i} className="nav-item">
              <a href={item.link}>
                <p>{item.title}</p>
              </a>
            </li>
          ))}
        </ul>
        {HamMenu ? (
          <i
            className="fa-solid fa-xmark nav-btn"
            onClick={() => setHamMenu(0)}
          ></i>
        ) : (
          <i
            className="fa-solid fa-bars nav-btn"
            onClick={() => setHamMenu(1)}
          ></i>
        )}
      </div>
    </nav>
  );
}
