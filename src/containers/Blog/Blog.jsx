import React from "react";
import "./Blog.css";
import { TricksColum, PackageColum, BlogCatColum } from "../../components";

export default function Blog() {
  return (
    <div className="Blog">
      <div className="Blog-container">
        <PackageColum />
        <BlogCatColum />
        <TricksColum />
      </div>
    </div>
  );
}
