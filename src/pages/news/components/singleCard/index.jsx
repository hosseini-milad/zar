const url = import.meta.env.VITE_BASE_URL;
import Button from "@mui/material/Button";
import { datePersian } from "@utils/dateTime";
const SingleCard = ({ title, imageUrl, date, _id, detail }) => {
  return (
    <section className="single-card">
      <section className="single-card__image">
        <img
          className="single-news-image"
          src={`${url}${imageUrl}`}
          alt={title}
        />
      </section>
      <section className="single-card__content">
        <section className="header-title">{title.substring(0, 30)}</section>
        <section className="seperator"></section>
        <section className="info">
          <section className="date">
            <span className="label">تاریخ:</span>
            <span className="value persian-number">
              {datePersian(date, "time")}
            </span>
          </section>
          <section className="view-detail">
            <Button onClick={() => detail(_id)} className="btn-detail">
              مشاهده خبر
            </Button>
          </section>
        </section>
      </section>
    </section>
  );
};

export default SingleCard;
