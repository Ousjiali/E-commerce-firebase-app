import React from "react";

import { animateScroll as scroll } from "react-scroll";
import "./back-to-top.css";

const BackToTop = () => {
  const scrollToTop = (e) => {
    e.preventDefault();

    scroll.scrollToTop({
      duration: 1000,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <div className="to-top">
      <button onClick={scrollToTop} className="to-top-btn">
        Back to top
      </button>
    </div>
  );
};

export default BackToTop;
