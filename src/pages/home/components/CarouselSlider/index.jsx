import React from "react";
import Slider from "react-slick";

import "./CarouselSlider.scss";

// eslint-disable-next-line react/display-name
const CarouselSlider = React.memo(({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
    
  };
  const renderSlider = () => {
    return items.map((item) => (
      <section key={item._id} className="single-slide">
        <img src={item.imageUrl} alt="" />
      </section>
    ));
  };
  
  return (
    <section className="slider-wrapper">
      <Slider {...settings}>{renderSlider()}</Slider>
    </section>
  );
});

export default CarouselSlider;
