import { useEffect, useState } from "react";
import "./footer.scss";
import Menu from "./menu";
import Others from "./others";
import ScrollToTop from "./scrollToTop/scrollToTop";
import { useLocation } from "react-router-dom";
const othersPath = ["/invoice", "/account-report", "/news"];

const Footer = () => {
  let { pathname } = useLocation();
  let [hasSubMenu, setHasMenu] = useState(false);
  const Path = pathname;

  const handlerSubMenuState = (status) => {
    setHasMenu(status);
  };

  useEffect(() => {
    if (othersPath.includes(Path)) {
      setHasMenu(true);
    } else {
      setHasMenu(false);
    }
  }, [Path]);
  return (
    <>
      <section
        className={`footer ${hasSubMenu ? "show-others" : "hide-others"}`}
      >
        {/* <ScrollToTop /> */}
        <Menu subMenuStatus={handlerSubMenuState} />
        {hasSubMenu ? <Others /> : ""}
      </section>
    </>
  );
};

export default Footer;
