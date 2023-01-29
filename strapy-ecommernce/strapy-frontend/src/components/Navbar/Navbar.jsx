import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import SearchIcon from "@mui/icons-material/Search";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
// import Cart from "../Cart/Cart";
// import { useSelector } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.cart.user);

  console.log(user);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <img src="/img/logoPin.png" alt="" />
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <span>NG</span>
            {/* <KeyboardArrowDownIcon /> */}
          </div>
          <div className="item">
            <Link className="link" to="/product/women">
              Women
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/product/men">
              Men
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/product/kids">
              Kids
            </Link>
          </div>
        </div>
        <div className="center">
          <Link className="link" to="/">
            STRAPY STORE
          </Link>
        </div>
        <div className="right">
          <div className="item">
            <Link className="link" to="/">
              Homepage
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/create/postad">
              Seller
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              About
            </Link>
          </div>

          <div className="icons">
            {/* <SearchIcon /> */}
            {/* <PersonOutlineOutlinedIcon /> */}
            {/* <FavoriteBorderOutlinedIcon /> */}
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon />
              <span>{user.length}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
