import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const nextHandler = () => {
    navigate("/view/seller/items");
  };

  return (
    <div className="strapy__clients">
      {/* <div className="strapy__seller">
        <button className="seller__btn">Seller</button>
      </div> */}
      <div className="strapy__buyer">
        <button className="buyer__btn" onClick={nextHandler}>
          Buyer
        </button>
      </div>
    </div>
  );
};
