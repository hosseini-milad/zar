import React from "react";
import "./Education.css";
import banner_moradi from "../../assets/Education/moradi.jpg";
import banner_sadegh from "../../assets/Education/sadegh.jpg";
import banner_soltani from "../../assets/Education/soltani.jpg";
import { EducationColum } from "../../components";
export default function Education() {
  const EdList = [
    {
      banner: banner_sadegh,
      title: "روش ارائه به سرمایه گذار",
      teacher: "استاد محمدجواد محمد صادق",
    },
    {
      banner: banner_soltani,
      title: "انواع روش های تامین مالی استارتاپ",
      teacher: "استاد محمدرضا سلطانی نوید",
    },
    {
      banner: banner_moradi,
      title: "انواع روش های تبادل فناوری",
      teacher: "استاد مهدی مرادی",
    },
  ];
  return (
    <div className="Education">
      <div className="Education-title">
        <div className="line"></div>
        <div className="title">
          <p>مشاهده</p>
          <p>آموزش ها</p>
        </div>
        <div className="line"></div>
      </div>

      <div className="Education-container">
        {EdList.map((Education, e) => (
          <EducationColum key={e} Education={Education} />
        ))}
      </div>
    </div>
  );
}
