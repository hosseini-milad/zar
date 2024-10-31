import { useLocation, useNavigate } from "react-router-dom";
import AccountReport from "@/assets/images/icons/accountReport.svg";
import News from "@/assets/images/icons/news.svg";
import Bill from "@/assets/images/icons/bill.svg";
const Others = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const changeLocation = (path) => {
    navigate(path);
  };
  return (
    <section className="others">
      <section className="menu-wrapper sub-menu">
        <section
          onClick={() => changeLocation("/invoice")}
          className={`single-menu sub-menu__item pointer ${
            pathname === "/invoice" ? "selected" : ""
          }`}
        >
          <img className="icon" src={Bill} alt="" />
          <span className="title">صورت حساب</span>
        </section>
        <section
          onClick={() => changeLocation("/account-report")}
          className={`single-menu sub-menu__item pointer ${
            pathname === "/account-report" ? "selected" : ""
          }`}
        >
          <img className="icon" src={AccountReport} alt="" />
          <span className="title">گزارش حساب</span>
        </section>
        <section
          onClick={() => changeLocation("/news")}
          className={`single-menu sub-menu__item pointer ${
            pathname === "/news" ? "selected" : ""
          }`}
        >
          <img className="icon" src={News} alt="" />
          <span className="title">اخبار</span>
        </section>
      </section>
    </section>
  );
};

export default Others;
