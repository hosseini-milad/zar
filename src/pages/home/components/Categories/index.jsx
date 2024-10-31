import Slider from "react-slick";
import "./categories.scss";
import allProductImage from "@/assets/images/Zar-All.jpg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const url = import.meta.env.VITE_BASE_URL;
const allProductInformation = {
  _id: "00005",
  uniqKey: "allProduct",
  catCode: "allProduct",
  title: "همه محصولات",
};
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

const Categories = ({ selected, items }) => {
  let sliderSetting = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const insertObjectToArray = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index),
  ];
  const renderCategoryItems = () => {
    let newCategorieData = insertObjectToArray(items, 2, allProductInformation);
    return (
      newCategorieData &&
      newCategorieData?.length &&
      newCategorieData.map((item) => (
        <section
          onClick={() => selected(item.catCode)}
          key={item._id}
          className="categories__single-item pointer"
        >
          {item.uniqKey === "allProduct" ? (
            <img className="category-image" src={allProductImage} alt="" />
          ) : (
            <img
              className="category-image"
              src={`${url}${item.thumbUrl}`}
              alt=""
            />
          )}
          <span className="category-name">{item.title}</span>
        </section>
      ))
    );
  };

  return (
    <section className="categories">
      <Slider {...sliderSetting}>
        {/* {renderAllProducts()} */}
        {renderCategoryItems()}
      </Slider>
    </section>
  );
};

export default Categories;
