import React from "react";
import { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
// import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/cartReducer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { addToCart } from "../../redux/cartReducer";

const Product = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    const fetchDocById = async () => {
      setLoading(true);
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser({
          ...docSnap.data(),
        });
      } else {
        setUser({});
      }
      setLoading(false);
    };
    fetchDocById();
  }, [id]);

  console.log(user);

  const detailsData = user && user.imageList ? user.imageList : [];
  console.log(detailsData[0]);

  return (
    <>
      <Navbar />
      <div className="product">
        {loading ? (
          "loading"
        ) : (
          <>
            <div className="left">
              <div className="images">
                <img
                  src={detailsData[0]}
                  alt=""
                  onClick={(e) => setSelectedImg(0)}
                />
                <img
                  src={detailsData[1]}
                  alt=""
                  onClick={(e) => setSelectedImg(1)}
                />
                <img
                  src={detailsData[2]}
                  alt=""
                  onClick={(e) => setSelectedImg(2)}
                />
              </div>
              <div className="mainImg">
                <img src={detailsData[selectedImg]} alt="" />
              </div>
            </div>
            <div className="right">
              <h1>{user?.productName}</h1>
              <span className="price">₦{user.adNairaPrice}</span>
              <p>{user.adDescribe}</p>
              <div className="quantity">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                >
                  -
                </button>
                {quantity}
                <button onClick={() => setQuantity((prev) => prev + 1)}>
                  +
                </button>
              </div>
              <button
                className="add"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: id,
                      productName: user.productName,
                      adDescribe: user.adDescribe,
                      adNairaPrice: user.adNairaPrice,
                      imageList: detailsData[0],
                      quantity,
                    })
                  )
                }
              >
                <AddShoppingCartIcon /> ADD TO CART
              </button>
              {/* <div className="links">
                <div className="item">
                  <FavoriteBorderIcon /> ADD TO WISH LIST
                </div>
                <div className="item">
                  <BalanceIcon /> ADD TO COMPARE
                </div>
              </div> */}
              <div className="info">
                <span>Product Type: {user?.categories}</span>
                <span>Product Name: {user?.productName}</span>
                <span>Tag: {user?.category}</span>
                <span>Size: {user?.adSize}</span>
              </div>
              <hr />
              <div className="info">
                {/* <span>DESCRIPTION</span>
                <hr />
                <span>ADDITIONAL INFORMATION</span>
                <hr /> */}
                <span>FAQ</span>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Product;
