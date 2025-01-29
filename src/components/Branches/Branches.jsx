import React from "react";
import "./Branches.css";
export default function Branches() {
  const BranchList = [
    {
      title: "فرمانیه",
      address:
        "خیابان پاسداران شمالی، پایین‌تر از چهارراه فرمانیه، نبش نارنجستان چهارم پلاک ۱.",
      phone: "02128282828",
    },
    {
      title: "سعادت آباد",
      address:
        "خیابان پاسداران شمالی، پایین‌تر از چهارراه فرمانیه، نبش نارنجستان چهارم پلاک ۱.",
      phone: "02128282828",
    },
    {
      title: "ونک",
      address:
        "خیابان پاسداران شمالی، پایین‌تر از چهارراه فرمانیه، نبش نارنجستان چهارم پلاک ۱.",
      phone: "02128282828",
    },
    {
      title: "ستارخانه",
      address:
        "خیابان پاسداران شمالی، پایین‌تر از چهارراه فرمانیه، نبش نارنجستان چهارم پلاک ۱.",
      phone: "02128282828",
    },
  ];
  return (
    <div className="Branches" id="branches">
      <div className="section-title">شعب فروشگاه برزگر</div>
      <div className="Branches-container">
        {BranchList.map((branch, b) => (
          <div key={b} className="branch-item">
            <div className="wrapper">
              <i class="fa-solid fa-location-dot"></i>
              <p>{branch.title}</p>
            </div>
            <p className="address">{branch.address}</p>
            <div className="wrapper phone">
              <i class="fa-solid fa-phone-volume"></i>
              <p>{branch.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
