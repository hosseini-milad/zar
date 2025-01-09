import React from "react";
import "./ProductListCard.css";
export default function ProductListCard(props) {
  const { data } = props;
  return (
    <div className="ProductListCard">
      <div className="ProductListCard-container">
        <div className="col col-img">
          <img src={data.img} alt={data.img} />
        </div>
        <div className="col col-desc">
          <p className="title">{data.title}</p>
          <p className="desc">{data.description}</p>
          <a href="#">Show More...</a>
          <ul>
            <li>
              <label>Supply Ability:</label>
              <span>{data.abillity}</span>
            </li>
            <li>
              <label>Origin:</label>
              <span>{data.origin}</span>
            </li>
            <li>
              <label>Location:</label>
              <span>{data.Location}</span>
            </li>
          </ul>
        </div>
        <div className="col col-company">
          <p className="company">{data.company}</p>
          <ul>
            <li>
              <label>Business Type:</label>
              <span>{data.type}</span>
            </li>
            <li>
              <label>Key Products:</label>
              <span>{data.key.substring(0, 20)+"..."}</span>
            </li>
          </ul>
          <div className="btn-wrapper">
            <button>View Price</button>
            <button>Contact Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
