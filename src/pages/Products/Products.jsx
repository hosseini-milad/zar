import React from "react";
import { AllCategory } from "../../containers";
import { NavList, Banner } from "../../components";
import BgBanner from "../../assets/Banners/products-banner.jpg";
export default function Products() {
  const BannerInfo = {
    Image: BgBanner,
    title: "Manufacturers & Suppliers Directory",
    text: "eWorldTrade welcomes buyers from all over the world to its comprehensive marketplace, a wholesale center for buyers to connect with suppliers, manufacturers, and wholesalers from around the globe.",
  };
  const NavLists = [
    {
      title: "Home",
      link: "",
    },
    {
      title: "Manufacturers & Suppliers Directory",
      link: "products",
    },
  ];
  return (
    <>
      <NavList list={NavLists} />
      <Banner
        Image={BannerInfo.Image}
        title={BannerInfo.title}
        text={BannerInfo.text}
      />
      <AllCategory />
    </>
  );
}
