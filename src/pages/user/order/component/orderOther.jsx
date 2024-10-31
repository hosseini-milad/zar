import { moneyFormater } from "@utils/money";
const OrderOther = ({
  unitPrice,
  fullPrice,
  totalWeight,
  totalPrice,
}) => {
  return (
    <section className="single-item  user-order my-order-details">
      <section className="single-item__content">
        <section className="inner">
          <section className="product-price-calculation">
            <section className="product-price-calculation__header">
              <section className="total-price public-col border-left">
                قیمت واحد
              </section>
              <section className="total-price public-col border-left">
                مبلغ کل
              </section>
              <section className="discount public-col border-left">
                وزن کل
              </section>
              <section className="discount public-col border-left">
                قیمت نهایی
              </section>
            </section>
            <section className="product-price-calculation__content">
              <section className="total-price public-col border-left grey-color persian-number">
                <span className="price">{moneyFormater(unitPrice)}</span>
                <span className="unit">ریال</span>
              </section>
              <section className="total-price public-col border-left grey-color persian-number">
                <span className="price">{moneyFormater(fullPrice)}</span>
                <span className="unit">ریال</span>
              </section>
              <section className="discount public-col border-left grey-color persian-number">
                <span className="price">{totalWeight}</span>
                <span className="unit">گرم</span>
              </section>
              <section className="discount public-col border-left grey-color persian-number">
                <span className="price">{moneyFormater(totalPrice)}</span>
                <span className="unit">ریال</span>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};
export default OrderOther;
