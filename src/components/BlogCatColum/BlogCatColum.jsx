import React from "react";
import "./BlogCatColum.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
export default function BlogCatColum() {
  const FlagList = [
    {
      title: "China",
      icon: "fi fi-cn fis",
      link: "#",
    },
    {
      title: "Turkey",
      icon: "fi fi-tr fis",
      link: "#",
    },
    {
      title: "USA",
      icon: "fi fi-us fis",
      link: "#",
    },
    {
      title: "Japan",
      icon: "fi fi-jp fis",
      link: "#",
    },
    {
      title: "Malaysia",
      icon: "fi fi-my fis",
      link: "#",
    },
    {
      title: "Egypt",
      icon: "fi fi-eg fis",
      link: "#",
    },
    {
      title: "Germany",
      icon: "fi fi-de fis",
      link: "#",
    },
    {
      title: "India",
      icon: "fi fi-in fis",
      link: "#",
    },
  ];
  return (
    <div className="BlogCatColum">
      <div className="Blog-title">
        <p>دسته بندی بلاگ</p>
      </div>
      <div className="BlogCatColum-container">
        {FlagList.map((flag,i)=>(
          <a key={i} href={flag.href} className="flag-box">
            <i className={flag.icon}></i>
            <p>{flag.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
