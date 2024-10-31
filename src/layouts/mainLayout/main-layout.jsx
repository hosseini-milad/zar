import { Outlet } from "react-router-dom";
import { lazy, useEffect } from "react";
import { getToken } from "@core/storageService";
import { getOrders } from "@service/orders";

import "./style.scss";

import Header from "@components/Header";
import Footer from "@components/Footer";
import { useAppContext } from "@/context/App/app-context";

// const Header = lazy(() => import("@components/Header"));
// const Footer = lazy(() => import("@components/Footer"));

const MainLayout = () => {
  const { initialBasket } = useAppContext();
  const token = getToken();
  const getBasket = async () => {
    try {
      await getOrders().then((response) => {
        if (response.status === 200) {
          let { cart, cartDetail } = response.data;
          initialBasket(cart, cartDetail);
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    if (token) {
      getBasket();
    }
  }, []);
  return (
    <>
      <Header />
      <section className="main">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default MainLayout;
