import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Spinner from "../../../components/Spinner";
import { db } from "../../../firebase";
import { usePaystackPayment } from "react-paystack";
import CurrencyFormat from "react-currency-format";
import "./getSellerDetails.css";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

// import { AuthContext } from "../../../context/AuthContext";
// import "./getSellerDetails.css";

const GetSellerDetails = () => {
  const user = useSelector((state) => state.cart.user);
  console.log(user[0].adNairaPrice);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [deliveryAddress, setDeliveryAddress] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  // const publicKey = "pk_test_9215eb8a4a70947df609c473a4ba0c6b475c3656";
  const amount = user[0].adNairaPrice * 100;

  const navigate = useNavigate();

  const buyerCollectionRef = collection(db, "registerbuyer");

  const onSuccess = () => {
    setLoading(true);
    if (!firstName || !lastName || !email || !deliveryAddress || !phoneNo) {
      setLoading(false);
      return swal("Warning", "All Fields are required", "error");
    }
    addDoc(buyerCollectionRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      deliveryAddress: deliveryAddress,
      phoneNo: phoneNo,
      amount: amount,
    })
      .then(() => {
        setLoading(false);
        swal({ title: "Success", text: "Details Submitted", icon: "success" });
      })
      .then((ok) => {
        setFirstName("");
        setLastName("");
        setPhoneNo(0);
        setEmail("");
        setDeliveryAddress("");
        if (ok) {
          navigate("/view/seller/items");
        }
      })
      .catch(() => {
        setLoading(false);
        swal("Error", "Error while Submitting", "Error");
      });
  };

  const prefix = "₦";

  const backHandler = () => {
    navigate("/view/seller/items");
  };
  const config = {
    publicKey: "pk_test_9215eb8a4a70947df609c473a4ba0c6b475c3656",
    reference: new Date().getTime(),
    email: email,
    amount,
    metadata: {
      lastName,
      phoneNo,
    },
  };

  // let { id } = useParams();

  const totalPrice = () => {
    let total = 0;
    user.forEach((item) => {
      total += item.quantity * item.adNairaPrice;
    });
    console.log(total);
    return total.toFixed(2);
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <>
      <Navbar />
      <div className="strapy__buyer2">
        {/* <form> */}
        <div className="strapy__buyerContainer">
          {loading ? (
            <Spinner />
          ) : (
            <div className="strapy__buyerContent">
              <div>
                <h2>Check Out Payment</h2>
              </div>
              <div className="strapy__buyerInput">
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required={true}
                />
              </div>
              <div className="strapy__buyerInput">
                <label>Last Name</label>
                <input
                  type="text"
                  vaule={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  required={true}
                />
              </div>
              <div className="strapy__buyerInput">
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required={true}
                />
              </div>
              <div className="strapy__buyerInput">
                <label>Address</label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => {
                    setDeliveryAddress(e.target.value);
                  }}
                  required={true}
                />
              </div>
              <div className="strapy__buyerInput" value={phoneNo}>
                <label>Phone Number</label>
                <input
                  type="number"
                  onChange={(e) => {
                    setPhoneNo(e.target.value);
                  }}
                  required={true}
                />
              </div>
              <div className="strapy__buyPayment">
                <CurrencyFormat
                  renderText={(value) => (
                    <p>
                      Subtotal ({user.length}{" "}
                      {user.length >= 2 ? "items" : "item"}
                      ): <strong>{value}</strong>
                    </p>
                  )}
                  // renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  // value={user[0].adNairaPrice}
                  value={totalPrice()}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={prefix}
                />
              </div>

              <div className="strapy__buyerBtn">
                {/* <PaystackButton {...submitHandler} {...componentProps} /> */}

                <button
                  className="strapy__buyerBtn2"
                  type="submit"
                  onClick={() => initializePayment(onSuccess)}
                >
                  Submit
                </button>
                <button className="strapy__buyerBtn3" onClick={backHandler}>
                  Go Back
                </button>
              </div>
            </div>
          )}
        </div>
        {/* </form> */}
      </div>
      <Footer />
    </>
  );
};

export default GetSellerDetails;
