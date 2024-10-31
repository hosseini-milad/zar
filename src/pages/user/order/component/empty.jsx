import { useNavigate } from "react-router-dom";
import CartEmpty from "@/assets/images/icons/cartEmpty.svg";
import Button from "@mui/material/Button";
const Empty = () => {
  const navigate = useNavigate();
  const showProductsList = () => {
    navigate("/");
  };
  return (
    <section className="empty-order">
      <section className="empty-order__message">
        <img className="empty-order__message--image" src={CartEmpty} alt="" />
        <section className="message">شما تاکنون سفارش ثبت نکرده اید!</section>
      </section>
      <Button
        onClick={() => showProductsList()}
        className="show-products font-iransans"
      >
        مشاهده محصولات
      </Button>
    </section>
  );
};

export default Empty;
