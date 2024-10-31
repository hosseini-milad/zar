import { moneyFormater } from "@utils/money";

const OrderInformation = ({
  weight,
  price,
  sku,
  totalPrice,
  index,
  title,
  netPrice,
  totalDiscount,
  totalAddition,
  unitPrice,
  fullPrice,
  priceDetail,
}) => {
  return (
    <section className="single-item user-order my-order-details">
      <section className="single-item__header">
        {/* <section className="id public-col border-left">ردیف</section> */}
        <section className="code view-id public-col border-left">ردیف</section>
        <section className="code public-col border-left">کد کالا</section>
        <section className="description public-col">شرح کالا</section>
        <section className="count public-col border-right">وزن</section>
      </section>
      <section className="single-item__content">
        <section className="inner">
          <section className="product-info">
            <section className="product-info__code view-id public-col persian-number border-left">
              {index + 1}
            </section>
            <section className="product-info__code public-col persian-number border-left">
              {sku}
            </section>
            <section className="product-info__description public-col">
              {title}
            </section>
            <section className="product-info__count public-col persian-number border-right">
              {weight}
            </section>
          </section>
          <section className="product-price-calculation">
            <section className="product-price-calculation__header">
              <section className="unit-price public-col border-left">
                قیمت واحد
              </section>
              <section className="total-price public-col border-left">
                مبلغ کل
              </section>
              <section className="total-price public-col border-left">
                مالیات
              </section>
              <section className="discount public-col border-left">
                اجرت
              </section>
              <section className="final-price public-col">مبلغ نهایی</section>
            </section>
            <section className="product-price-calculation__content">
              <section className="unit-price public-col border-left grey-color persian-number">
                <span className="price">{moneyFormater(unitPrice)}</span>
                <span className="unit">ریال</span>
              </section>
              <section className="total-price public-col border-left grey-color persian-number">
                <span className="price">{moneyFormater(fullPrice)}</span>
                <span className="unit">ریال</span>
              </section>
              <section className="total-price public-col border-left grey-color persian-number">
                <span className="price">{moneyFormater(priceDetail.taxPrice)}</span>
                <span className="unit">ریال</span>
              </section>
              <section className="discount public-col border-left grey-color persian-number">
                <span className="price">{moneyFormater(priceDetail.ojratPrice)}</span>
                <span className="unit">ریال</span>
              </section>
              <section className="final-price public-col red-color persian-number">
                <span className="price">{moneyFormater(price)}</span>
                <span className="unit">ریال</span>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default OrderInformation;
