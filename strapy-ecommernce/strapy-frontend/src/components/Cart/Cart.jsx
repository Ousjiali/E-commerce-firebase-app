import React from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Cart = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.cart.user);
  const dispatch = useDispatch();
  console.log(user);

  const totalPrice = () => {
    let total = 0;
    user.forEach((item) => {
      total += item.quantity * item.adNairaPrice;
    });
    console.log(total);
    return total.toFixed(2);
  };

  const handlePayment = () => {
    navigate(`/buyer/register/page/${id}`);
  };

  return (
    <div className="cart">
      <h3>Products in your cart</h3>
      {user?.map((item) => (
        <div className="item" key={item.id}>
          <img src={item?.imageList} alt="" />
          <div className="details">
            <h1>{item.productName}</h1>
            <p>{item.adDescription?.substring(0, 100)}</p>
            <div className="price">
              {item.quantity} x ₦{item.adNairaPrice}
            </div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span> ₦{totalPrice()}</span>
      </div>
      <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
