import { useNavigate } from "react-router-dom";
import EmptyBasket from "@/assets/images/icons/cartEmpty.svg";
import Button from "@mui/material/Button";
const Empty = () => {
  const navigate = useNavigate();
  const showProductsList = () => {
    navigate("/");
  };
  return (
    <section className="empty">
      <section className="image-message">
        <img className="image" src={EmptyBasket} alt="" />
        <section className="message">سبد خرید شما خالی است.</section>
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
