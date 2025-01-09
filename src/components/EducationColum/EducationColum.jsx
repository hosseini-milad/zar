import React from "react";
import "./EducationColum.css";
export default function EducationColum(props) {
  const { Education } = props;
  return (
    <div className="EducationColum">
      <div className="EducationColum-container">
        
          <img src={Education.banner} alt={Education.title} />
          <p>{Education.title}</p>
          <p>{Education.teacher}</p>
        
      </div>
    </div>
  );
}
