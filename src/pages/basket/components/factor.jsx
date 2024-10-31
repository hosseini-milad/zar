import { moneyFormater } from "@utils/money";
const Factor = ({
  cartCount,
  cartPrice,
  cartDiscount,
  cartTax,
  cartTotal,
  cartWeight,
}) => {
  return (
    <section className="factor">
      <section className="factor__key">
        {/* <section className="single-title child-public-style border-bottom border-left">
         جمع وزن
        </section> */}
        <section className="single-title child-public-style border-bottom border-left persian-number">
          جمع وزن {cartWeight} گرم
        </section>

        {/* <section className="single-title child-public-style border-bottom border-left">
          مالیات بر ارزش افزوده
        </section> */}
        {/* <section className="single-title child-public-style border-bottom border-left">
          تخفیفات
        </section>
        <section className="single-title child-public-style border-left">
          مبلغ کل
        </section> */}
      </section>
      <section className="factor__value">
        {/* <section className="single-value child-public-style border-bottom">
          <span className="price persian-number">{cartWeight} کیلوگرم</span>
        </section> */}
        <section className="single-value child-public-style border-bottom">
          مجموع فاکتور
          <span className="price persian-number">
            {moneyFormater(cartPrice)}
          </span>
        </section>
        {/* <section className="single-value child-public-style border-bottom">
          تخفیف
          <span className="price persian-number">
            {moneyFormater(cartDiscount)}
          </span>
        </section> */}
        {/* <section className="single-value child-public-style border-bottom">
          مالیات
          <span className="price persian-number">{moneyFormater(cartTax)}</span>
        </section> */}
        {/* <section className="single-value  child-public-style">
          مبلغ کل
          <span className="price persian-number">
            {moneyFormater(cartTotal)}
          </span>
        </section> */}
      </section>
    </section>
  );
};

export default Factor;
