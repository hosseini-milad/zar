import React from "react";
import "./CatCard.css";
export default function CatCard(props) {
  const { item } = props;
  return (
    <div className="CatCard">
      <div className="CatCard-container">
        <img src={item.img} alt={item.title} />
        <div className="list-wrapper">
          <a href={"/products/" + item.title} className="title">
            {item.title}
          </a>
          <ul className="list">
            {item.list.map((li, l) => (
              <li key={l}>
                <a href={"/products/" + item.title + "/" + li}>{li}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
