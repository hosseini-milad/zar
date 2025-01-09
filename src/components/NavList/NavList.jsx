import React from "react";
import "./NavList.css";
export default function NavList(props) {
  const { list } = props;
  return (
    <div className="NavList">
      <div className="NavList-container">
        <div className="nav-wrapper">
          {list.map((nav, n) => (
            <a key={n} href={"/" + nav.link}>
              {nav.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
