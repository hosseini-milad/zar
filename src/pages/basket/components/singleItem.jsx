import Edit from "@/assets/images/icons/edit-basket-item.svg";
import Delete from "@/assets/images/icons/delete-basket-item.svg";
import { moneyFormater } from "@utils/money";
const SingleItem = ({
  ItemID,
  count,
  initDate,
  price,
  progressDate,
  sku,
  totalPrice,
  unitId,
  remove,
  index,
  edit,
  weight,
  title,
  unitPrice,
  fullPrice,
  isMojood,
  isReserve,
}) => {
  const editProductCount = () => {
    let modelEditProduct = {
      sku,
      count,
    };
    edit(modelEditProduct);
  };
  
  return (
    <section className="single-item">
      <section className="single-item__header">
        <section className="id public-col border-left">ردیف</section>
        <section className="code public-col border-left">کد کالا</section>
        <section className="description public-col">شرح کالا</section>
        <section className="count public-col border-right">وزن</section>
      </section>
      <section className="single-item__content">
        <section className="id-number-actions border-left persian-number">
          <section className="id-number">{index + 1}</section>
          <section className="action pointer">
            <img onClick={() => editProductCount()} src={Edit} alt="" />
            <img onClick={() => remove(sku)} src={Delete} alt="" />
          </section>
        </section>
        <section className="inner">
          <section className="product-info">
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
              <section className="discount public-col border-left">
                وضعیت
              </section>
              <section className="final-price public-col">قابل پرداخت</section>
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
              <section className="discount public-col border-left grey-color persian-number">
                <span className="price">{isMojood?'موجود':isReserve?"ناموجود":"ناموجود"}</span>
                
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

export default SingleItem;
