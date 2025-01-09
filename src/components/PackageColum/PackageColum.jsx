import React from "react";
import "./PackageColum.css";
import label from "../../assets/Packages/Package-pro.webp";
export default function PackageColum() {
  const PackageList = [
    {
      title: "Premium Features",
      List: [
        "Trusted Supplier Premium Membership Flag",
        "Profile Listing on B2B eWorldTrade",
        "Connected Buyers",
        "Connected Buyers",
        "Buyer Alerts",
        "Performance & Buyer Report",
        "Upload Company Certificate / Video / Brochure / Images",
        "Key Account Manager",
      ],
    },
    {
      title: "H2H (Human Assistance)",
      List: [
        "Trusted Supplier Premium Membership Flag",
        "Profile Listing on B2B eWorldTrade",
        "Connected Buyers",
        "Connected Buyers",
        "Buyer Alerts",
        "Performance & Buyer Report",
        "Upload Company Certificate / Video / Brochure / Images",
        "Key Account Manager",
      ],
    },
    {
      title: "Digital Services",
      List: [
        "Trusted Supplier Premium Membership Flag",
        "Profile Listing on B2B eWorldTrade",
        "Connected Buyers",
        "Connected Buyers",
        "Buyer Alerts",
        "Performance & Buyer Report",
        "Upload Company Certificate / Video / Brochure / Images",
        "Key Account Manager",
      ],
    },
  ];
  return (
    <div className="PackageColum">
      <div className="Blog-title">
        <p>پکیج ها</p>
      </div>
      <div className="PackageColum-container">
        <div className="Package-label">
          <img src={label} alt="label" />
        </div>
        <div className="Package-List">
          {PackageList.map((List, i) => (
            <>
              <p className="list-title">{List.title}</p>
              <ul>
                {List.List.map((item, p) => (
                  <li key={p}>{item}</li>
                ))}
              </ul>
            </>
          ))}
        </div>
        <div className="btn-wrapper">
          <button>جزئیات بیشتر</button>
        </div>
      </div>
    </div>
  );
}
