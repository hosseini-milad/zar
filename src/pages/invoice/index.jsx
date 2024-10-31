import "./Invoice.scss";
import Report from "@/assets/images/icons/accountReport.svg";

import Empty from "./components/empty";
import SingleCard from "./components/singleCard";
import { completedFactors } from "@service/orders";
import { useEffect, useState } from "react";
const Invoice = () => {
  const [facktorList, setFacktorList] = useState([]);

  const getListFacktors = async () => {
    try {
      await completedFactors().then((response) => {
        setFacktorList(response.data.data);
      });
    } catch (error) {}
  };

  useEffect(() => {
    getListFacktors();
  }, []);

  const renderFacktorCard = () => {
    return facktorList.length === 0 ? (
      <Empty />
    ) : (
      facktorList.map((factor) => <SingleCard key={factor._id} {...factor} />)
    );
  };
  return (
    <section className="invoice">
      <section className="invoice__header">
        <img className="logo" src={Report} alt="" />
        <span className="title">صورت حساب</span>
      </section>
      <section className="invoice__content">
        <section className="report">
          <section className="report__header">
            <section className="children">شماره سفارش</section>
            <section className="children">تاریخ سفارش</section>
            <section className="children">دانلود فاکتور</section>
          </section>
          <section className="seperator"></section>
          <section className="inner-content">{renderFacktorCard()}</section>
        </section>
      </section>
    </section>
  );
};

export default Invoice;
