import React from "react";
import "./CategoryTabs.css";
import Auto from "../../assets/CatTabs/Auto.webp";
import Home from "../../assets/CatTabs/Home.webp";
import Light from "../../assets/CatTabs/Light.webp";
import Machinery from "../../assets/CatTabs/Machinery.webp";
export default function CategoryTabs(props) {
  const { SelectedTab, setSelectedTab } = props;
  const TabList = [
    { enTitle: "Home", img: Home, title: "ساختمانی بهداشتی" },
    { enTitle: "Machine", img: Machinery, title: "تجهیزات متفرقه" },
    { enTitle: "Light", img: Light, title: "تجهیزات الکترونیکی" },
    { enTitle: "Auto", img: Auto, title: "تجهیزات مکانیکی" },
  ];
  return (
    <div className="CategoryTabs">
      <div className="CategoryTabs-container">
        {TabList.map((Tab, i) => (
          <div
            onClick={() => setSelectedTab(Tab.enTitle)}
            className={`tab-item ${
              Tab.enTitle === SelectedTab ? "active-tab" : ""
            }`}
          >
            <img src={Tab.img} alt={Tab.enTitle} />
            <p>{Tab.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
