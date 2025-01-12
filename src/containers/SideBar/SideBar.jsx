import React, { useState } from "react";
import "./Sidebar.css";
export default function SideBar() {
  const MenuList = [
    {
      title: "پروفایل",
      index: 0,
      icon: "fa-user",
      href: "Profile",
      url: "Profile",
    },
    {
      title: "محصولات",
      index: 1,
      icon: "fa-list",
      href: "#",
      url: "",
      children: [
        {
          title: "محصول جدید",
          index: 0,
          href: "NewProduct",
          url: "NewProduct",
        },
        {
          title: "لیست محصولات",
          index: 1,
          href: "ProductLists",
          url: "ProductLists",
        },
      ],
    },
  ];
  console.log(window.location.pathname.split("/")[2]);
  const [openIndex, setOpenIndex] = useState(null);

  const handleMenuClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getCurrentPage = () => {
    return window.location.pathname.split("/")[2];
  };

  const isActive = (url) => {
    return getCurrentPage() === url;
  };

  // Check if the current page is a child menu and set the openIndex accordingly
  useState(() => {
    MenuList.forEach((item, i) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (isActive(child.url)) {
            setOpenIndex(i);
          }
        });
      }
    });
  }, []);

  return (
    <div className="SideBar">
      <div className="SideBar-header">
        <div className="logo-wrapper">
          <img src="/Logo.png" alt="logo" />
        </div>
        <div className="profile-wrapper">
          <i className="fa-solid fa-user"></i>
          <p>نام کاربری</p>
        </div>
      </div>
      <div className="SideBar-list-wrapper">
        <ul className="SideBar-menu">
          {MenuList.map((item, i) => (
            <li key={i}>
              <a
                href={item.href}
                onClick={() => handleMenuClick(i)}
                className={isActive(item.url) ? "a-active" : ""}
              >
                <i className={`menu-icon fa-solid ${item.icon}`}></i>
                {item.title}
                {item.children && (
                  <i
                    class={`arrow-icon fa-solid fa-${
                      openIndex === i ? "chevron-down" : "chevron-left"
                    } `}
                  ></i>
                )}
              </a>
              {item.children && (
                <ul
                  className="sub-menu"
                  style={{
                    maxHeight: openIndex === i ? "200px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  {item.children.map((child, j) => (
                    <li key={j}>
                      <a
                        href={child.href}
                        className={isActive(child.url) ? "a-active" : ""}
                      >
                        {child.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
