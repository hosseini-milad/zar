import { useState } from "react";
import OrderInformation from "./orderInformation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Button from "@mui/material/Button";
import Accepted from "@/assets/images/icons/acceptedOrder.svg";
import Cancel from "@/assets/images/icons/cancelOrder.svg";
import { orderAccepted } from "@service/orders";
import { moneyFormater } from "@utils/money";
import { datePersian } from "@utils/dateTime";
import OrderOther from "./orderOther";

const SingleCard = ({
  initDate,
  items,
  status,
  faktorNo,
  cancelFactor,
  isEdit,
  rahId,
  active,
  isAdd,
  isOff,
  totalPrice,
  updateOrdersList,
  isClose,
  totalWeight,
  totalAddition,
  totalDiscount,
  netPrice,
  unitPrice,
  fullPrice,
}) => {
  const [orderInformation, setOrderInformation] = useState(false);
  const showInformation = () => {
    setOrderInformation((prev) => {
      return !prev;
    });
  };

  const acceptedOrder = async () => {
    try {
      await orderAccepted(rahId).then((response) => {
        console.log(response, "response");
        if (response.status === 200) {
          setOrderInformation(false);
          updateOrdersList();
        }
      });
    } catch (error) {
      console.log(error, "eroror");
    }
  };

  return (
    <section className="wrapper-single-card">
      <span className="status gold">{status}</span>
      <section className={`single-card ${orderInformation ? "active" : ""}`}>
        <section className="single-card__header">
          <section className="order-number">
            <section className="label">شماره سفارش:</section>
            <section className="content persian-number mt-8">
              {rahId ? rahId : "-"}
            </section>
          </section>
          <section className="total-price">
            <section className="label">مبلغ نهایی:</section>
            {/* className=
            {`content persian-number mt-8 ${
              isAdd || isOff ? "gold-color" : ""
            }`} */}
            <section className="content persian-number mt-8">
              {moneyFormater(totalPrice)} ریال
              {/* {moneyFormater(totalPrice)} ریال */}
            </section>
          </section>
          <section className="total-price">
            {/* className={`label ${isAdd || isOff ? "gold-color" : ""}`} */}
            <section className="label">وزن کل</section>
            {/* className=
            {`content persian-number mt-8 ${
              isAdd || isOff ? "gold-color" : ""
            }`} */}
            <section className="content persian-number mt-8">
              {totalWeight} گرم
            </section>
          </section>
          <section className="register-date-time">
            <section className="label">تاریخ و ساعت:</section>
            <section className="content persian-number mt-8">
              <span className="date">{datePersian(initDate)}</span>
              {/* <span className="time">
                11:25
                <span className="morning">AM</span>
              </span> */}
            </section>
          </section>
        </section>
        {orderInformation ? (
          <ExpandMoreIcon
            onClick={() => showInformation()}
            className="order-information pointer arrow-bottom"
          />
        ) : (
          <NavigateBeforeIcon
            onClick={() => showInformation()}
            className="order-information pointer arrow-left"
          />
        )}
      </section>

      {orderInformation && (
        <>
          {items.map((item, index) => (
            <OrderInformation
              {...item}
              key={item._id}
              index={index}
              isChange={isAdd}
              isOffer={isOff}
            />
          ))}

          {orderInformation && (
            <OrderOther
              unitPrice={unitPrice}
              fullPrice={fullPrice}
              totalWeight={totalWeight}
              totalPrice={totalPrice}
            />
          )}

          {/* <section className="order-action">
            {isEdit && !isClose && (
              <>
                <Button
                  onClick={() => cancelFactor(faktorNo)}
                  className="cancel btn-order"
                >
                  <img className="status-action" src={Cancel} alt="" />
                  لغو سفارش
                </Button>

                <Button
                  onClick={() => acceptedOrder()}
                  className="accepted btn-order"
                >
                  <img className="status-action" src={Accepted} alt="" />
                  تایید سفارش
                </Button>
              </>
            )}
          </section> */}
        </>
      )}
    </section>
  );
};

export default SingleCard;
