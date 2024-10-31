import Slider from "react-slick";
import "./categoriInline.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <section
      onClick={onClick}
      className={className}
      style={{ ...style, display: "block", color: "#828282" }}
    >
      <ArrowBackIosIcon style={{ fontSize: "25px" }} />
    </section>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <section
      onClick={onClick}
      className={className}
      style={{ ...style, display: "block", color: "#828282" }}
    >
      <ArrowForwardIosIcon style={{ fontSize: "25px" }} />
    </section>
  );
};
const CategoriInline = ({ items, selected }) => {
  let sliderSetting = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const renderCategories = () => {
    return (
      items &&
      items.length > 0 &&
      items.map((item) => (
        <section
          onClick={() => selected(item.catCode)}
          key={item._id}
          className="single-item-category pointer"
        >
          {item.title}
        </section>
      ))
    );
  };
  return (
    <section className="wrapper-category-inline">
      {items.length > 0 && (
        <Slider className="category-inline-slider" {...sliderSetting}>
          {renderCategories()}
        </Slider>
      )}
    </section>
  );
};

export default CategoriInline;
