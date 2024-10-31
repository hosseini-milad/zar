import { useLocation, useNavigate } from "react-router-dom";
import home from "@/assets/images/zarIcons/Zar-Home.svg";
import homeActive from "@/assets/images/zarIcons/Zar-Home-Active.svg";
import representationRequest from "@/assets/images/zarIcons/Zar-Gallery.svg";
import representationRequestActive from "@/assets/images/zarIcons/Zar-Gallery.svg";
import aboutUs from "@/assets/images/zarIcons/Zar-Aboutus.svg";
import basket from "@/assets/images/icons/basket.svg";
import basketActive from "@/assets/images/icons/basket-active.svg";
import Offers from "@/assets/images/zarIcons/Zar-Offers.svg";
import MyOrder from "@/assets/images/icons/myOrder.svg";
import other from "@/assets/images/icons/other.svg";

//---------------------------------------
import { getUser } from "@core/storageService";
import { useAppContext } from "@/context/App/app-context.jsx";
//---------------------------------------
const menus = [
  {
    id: 1,
    title: "خانه",
    image: "home",
  },
  {
    id: 2,
    title: "درخواست نمایندگی",
    image: "representationRequest",
  },
  {
    id: 3,
    title: "درباره ما",
    image: "aboutUs",
  },
  {
    id: 4,
    title: "شبکه های اجتماعی",
    image: "socialMedia",
  },
];

const goToAbout = () => {
  window.open(
    "https://202.ir/%D8%AF%D8%B1%D8%A8%D8%A7%D8%B1%D9%87-%D9%85%D8%A7/",
    "_blank"
  );
};
const goToSocialMedia = () => {
  window.open(
    "https://www.instagram.com/202_food?igsh=cXd0Y3RrdzEzMnN6",
    "_blank"
  );
};
const Menu = ({ subMenuStatus }) => {
  const { cartItems } = useAppContext();
  let { pathname } = useLocation();
  const navigate = useNavigate();

  const changeLocation = (path) => {
    navigate(path);
  };

  return (
    <section className="menu-wrapper">
      {/* home */}
      <section
        onClick={() => changeLocation("/")}
        className={`single-menu pointer ${pathname === "/" ? "active" : ""}`}
      >
        <img
          className="icon"
          src={`${pathname === "/" ? homeActive : home}`}
          alt=""
        />
        <span className="title">خانه</span>
      </section>
      <section
            className={`single-menu pointer ${
              pathname === "/gallery" ? "active" : ""
            }`}
            onClick={() => changeLocation("/gallery")}
          >
            <img
              className="icon"
              src={`${
                pathname === "/gallery"
                  ? representationRequestActive
                  : representationRequest
              }`}
              alt=""
            />
            <span className="title">گالری</span>
      </section>
      <section className="single-menu pointer">
        <img className="icon" src={aboutUs} alt="" />
        <span className="title">درباره ما</span>
      </section>
      <section className="single-menu pointer">
        <img className="icon" src={Offers} alt="" />
        <span className="title">شبکه های اجتماعی</span>
      </section>

    </section>
  );
};

export default Menu;
