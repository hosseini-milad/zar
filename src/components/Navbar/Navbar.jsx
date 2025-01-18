import React from "react";
import "./Navbar.css";
export default function Navbar(props) {
  const { navList } = props;
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="nav-list">
          {navList.map((item, i) => (
            <li key={i} className="nav-item">
              <a href={item.link}>
                <p>{item.title}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
