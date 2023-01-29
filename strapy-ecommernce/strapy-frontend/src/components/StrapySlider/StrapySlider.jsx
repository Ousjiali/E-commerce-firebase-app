import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./strapy-slider.css";

import strapyLog2 from "../../assets/strapyLog2.png";
import slider01 from "../../assets/slider01.jpg";
import strapyHomepic from "../../assets/strapyHomepic.jpg";
import slider04 from "../../assets/slider04.jpg";
import slider05 from "../../assets/slider05.jpg";
import slider06 from "../../assets/slider06.jpg";

const StrapySlider = () => {
  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="strapy-slider">
      <Slider {...settings}>
        <div>
          <img src={strapyLog2} alt="" />
        </div>
        <div>
          <img src={slider01} alt="" />
        </div>
        <div>
          <img src={strapyHomepic} alt="" />
        </div>
        <div>
          <img src={slider04} alt="" />
        </div>
        <div>
          <img src={slider05} alt="" />
        </div>
        <div>
          <img src={slider06} alt="" />
        </div>
      </Slider>
    </div>
  );
};

export default StrapySlider;
