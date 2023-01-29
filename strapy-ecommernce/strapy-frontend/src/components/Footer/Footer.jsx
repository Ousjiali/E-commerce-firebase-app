import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span style={{ fontSize: "13px" }}>Women</span>
          <span style={{ fontSize: "13px" }}>Men</span>
          <span style={{ fontSize: "13px" }}>Children</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span style={{ fontSize: "13px" }}>FAQ</span>
          <span style={{ fontSize: "13px" }}>Pages</span>
          <span style={{ fontSize: "13px" }}>Stores</span>
          <span style={{ fontSize: "13px" }}>Compare</span>
          <span style={{ fontSize: "13px" }}>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span style={{ fontSize: "11px" }}>
            Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit
            amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt
            ut labore etdolore.
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span style={{ fontSize: "11px" }}>
            Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit
            amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt
            ut labore etdolore.
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">Strapystore</span>
          <span className="copyright">
            © Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
