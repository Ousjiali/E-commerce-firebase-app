import React from "react";
// import ProductCategory from "../../../components/ProductCategory/ProductCategory";
// import WomenFashion from "../../../assets/WomenFashion.jpg";
// import MenFashion from "../../../assets/MenFashion.jpg";
// import KidsFashion from "../../../assets/KidsFashion.jpg";
// import BackToTop from "../../../components/BackToTop/BackToTop";
// import StrapySlider from "../../../components/StrapySlider/StrapySlider";
// import HeaderLink from "../../../components/HeaderLink";
import "./home-page.css";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import StrapyySlider from "../../../components/StrapyySlider/StrapyySlider";
import Categories from "../../../components/Categories/Categories";

const HomePage = () => {
  return (
    <>
      <main className="home">
        <Navbar />
        <StrapyySlider />
        <Categories />
      </main>
      {/* <BackToTop /> */}
      <Footer />
    </>
  );
};

export default HomePage;
