const url = import.meta.env.VITE_BASE_URL;
import { datePersian } from "@utils/dateTime";
import { GiNewspaper } from "react-icons/gi";
const LastNewsCard = ({ title, imageUrl, date }) => {
  return (
    <section className="single-card-last-news">
      <section className="single-card-last-news__image">
        {/* <img
          className="last-news-image"
          src={`${url}${imageUrl}`}
          alt={title}
        /> */}
        <GiNewspaper />
      </section>
      <section className="last-news-content">
        <section className="header-title">{title.substring(0, 50)}</section>
        <section className="info">
          <section className="date">
            <span className="label">تاریخ:</span>
            <span className="value persian-number">
              {datePersian(date, "time")}
            </span>
          </section>
        </section>
      </section>
    </section>
  );
};

export default LastNewsCard;
