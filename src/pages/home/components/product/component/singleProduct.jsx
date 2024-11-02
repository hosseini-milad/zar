import List from "@/assets/images/icons/list.svg";
import Plus from "@/assets/images/icons/plus.svg";
import { moneyFormater } from "@utils/money.js";
import { useLocation, useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_BASE_URL;
//--------------------------------------------------
import Button from "@mui/material/Button";
const SingleProduct = ({
  showDetail,
  addBasket,
  imageUrl,
  sku,
  title,
  thumbUrl,
  price,
  weight,
  meatPercent,
  duration,
  tarkib,
  temp,
  unitName,
  stepUnit,
}) => {
  const addCurrentProductToBasket = () => {
    let modelProductToBasket = {
      imageUrl: url + imageUrl,
      title,
      price,
      sku,
      unitName,
      stepUnit,
    };
    addBasket(modelProductToBasket);
  };

  const showSingleProductDetail = () => {
    let modelProductDetail = {
      imageUrl: url + imageUrl,
      title,
      price,
      sku,
      weight,
      meatPercent,
      duration,
      tarkib,
      temp,
      unitName,
      stepUnit,
    };
    showDetail(modelProductDetail);
  };
  const navigate = useNavigate();
  const changeLocation = (path) => {
    navigate(path);
  };
  return (
    <section className="single-product-card">
      <section className="single-product-card__image">
        <img className="product-image" src={`${url}${thumbUrl}`} alt="" />
      </section>
      <section className="single-product-card__information">
        <section className="wrapper-information">
          <section className="product-name blue-dark-color">
            {title.substring(0, 30)}
          </section>
          <section className="product-code grey-text">
            <span className="label">کد کالا : </span>
            <span className="value persian-number">{sku}</span>
          </section>
          <section className="product-unit grey-text">
            <span className="label">وزن : </span>
            <span className="value">{unitName}</span>
          </section>
          <section className="product-price red-text">
            <span className="label">قیمت واحد : </span>
            <span className="value persian-number">
              {price ? moneyFormater(price) : "-"}
              ریال
            </span>
          </section>
        </section>
        {/* className="single-product-card__action" */}
        <section className="action">
          <Button
            onClick={() => changeLocation(`/product-detail/${sku}`)}
            className="view-details btn blue-dark-color font-iransans"
          >
            <img className="icon" src={List} alt="" />
            <span className="text">جزئیات و خرید</span>
          </Button>
          {/* <Button
            onClick={() => addCurrentProductToBasket()}
            className="add-to-basket btn font-iransans"
          >
            <img className="icon" src={Plus} alt="" />
            <span className="text"> افزودن به سبد خرید</span>
          </Button> */}
        </section>
      </section>
    </section>
  );
};

export default SingleProduct;
