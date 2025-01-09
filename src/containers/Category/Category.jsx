import React, { useState } from "react";
import { CategoryLists, CategoryTabs } from "../../components";
import "./Category.css";
export default function Category() {
  const [SelectedTab, setSelectedTab] = useState("Home");
  return (
    <div className="Category">
      <div className="Category-container">
        <div className="Category-title">
          <div className="line"></div>
          <div className="title">
            <p>مشاهده</p>
            <p>دسته بندی ها</p>
          </div>
          <div className="line"></div>
        </div>

        <CategoryTabs
          setSelectedTab={setSelectedTab}
          SelectedTab={SelectedTab}
        />

        <CategoryLists SelectedTab={SelectedTab} />
      </div>
    </div>
  );
}
