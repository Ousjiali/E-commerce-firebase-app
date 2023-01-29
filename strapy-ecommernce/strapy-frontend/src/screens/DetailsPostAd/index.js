import React from "react";
import "./detailsPostAd.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../../context/PostAdContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import swal from "sweetalert";
import { db } from "../../firebase";
import Spinner from "../../components/Spinner";
import CurrencyInput from "react-currency-input-field";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export const DetalisPostAd = ({ defaultValue = "0" }) => {
  // const [adTitle, setAdTitle] = React.useState("");
  const [adCondition, setAdCondition] = React.useState("");
  const [adMaterial, setAdMaterial] = React.useState("");
  const [adColor, setAdColor] = React.useState("");
  const [adLengths, setAdLengths] = React.useState("");
  const [adWaist, setAdWaist] = React.useState("");
  const [adSize, setAdSize] = React.useState("");
  const [adDescribe, setAdDescribe] = React.useState("");
  const [adNairaPrice, setAdNairaPrice] = React.useState(defaultValue);
  const [adPhoneNo, setAdPhoneNo] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const {
    category,
    setCategory,
    setRegion,
    region,
    setCategories,
    categories,
    imageList,
    productName,
    setProductName,
    setImageList,
  } = useFormContext();

  console.log(category, region, categories, imageList, "Peace on earth");

  // const usersCollectionRef = collection(db, "users");

  const usersCollectionRef = collection(db, "users");

  // const [imageList, setImageList] = React.useState([]);

  const createUser = async () => {
    setLoading(true);

    await addDoc(usersCollectionRef, {
      category: category,
      categories: categories,
      region: region,
      productName: productName,
      imageList: imageList,
      adCondition: adCondition,
      adMaterial: adMaterial,
      adColor: adColor,
      adLengths: adLengths,
      adWaist: adWaist,
      adSize: adSize,
      adDescribe: adDescribe,
      adNairaPrice: adNairaPrice,
      adPhoneNo: adPhoneNo,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        setLoading(false);
        setCategory(null);
        setRegion(null);
        setCategories(null);
        setImageList([]);
        setProductName(null);
        setAdCondition("");
        setAdMaterial("");
        setAdColor("");
        setAdLengths("");
        setAdWaist("");
        setAdSize("");
        setAdDescribe("");
        setAdNairaPrice("");
        setAdPhoneNo("");
        swal("Success", "Details Submitted", "success");

        navigate("/details/postad");
      })
      .catch(() => {
        swal("Error", "Error while Submitting", "Error");
      });
  };

  const prefix = "₦";

  const handleChange = (newValue) => {
    console.log("onValueChange fired");
    if (newValue === undefined) {
      setAdNairaPrice("0");
    } else {
      setAdNairaPrice(newValue);
    }
  };

  return (
    <>
      <Navbar />
      <div className="detailsAd__Container">
        <div className="detailsAd__Content">
          <div className="detailsAd__Headline">
            <BiArrowBack
              onClick={() => {
                navigate(-1);
              }}
            />{" "}
            <h2>Add Item Details</h2>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {/* <form onSubmit={submitHandler}> */}
              <div className="strapy__postAdInput11">
                <div className="strapy__postAdlabel11">
                  <label>Condition of Outfit</label>
                  <select
                    onChange={(e) => setAdCondition(e.target.value)}
                    value={adCondition}
                    // required={true}
                  >
                    <option></option>
                    <option>Brand New</option>
                    <option>Second Hand</option>
                    <option>Uk Used</option>
                  </select>
                </div>
                <div className="strapy__postAdlabel11">
                  <label>Material</label>
                  <select
                    onChange={(e) => setAdMaterial(e.target.value)}
                    value={adMaterial}
                    // required={true}
                  >
                    <option></option>
                    <option>Slick</option>
                    <option>Wool</option>
                    <option>Cotton</option>
                  </select>
                </div>
                <div className="strapy__postAdlabel11">
                  <label>Color</label>
                  <select
                    onChange={(e) => setAdColor(e.target.value)}
                    value={adColor}
                    // required={true}
                  >
                    <option></option>
                    <option>Black</option>
                    <option>Gold</option>
                    <option>Pink</option>
                    <option>Blue</option>
                    <option>Brown</option>
                    <option>Grey</option>
                    <option>Yellow</option>
                    <option>White</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="strapy__postAdlabel11">
                  <label>Lenght(mm)</label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setAdLengths(e.target.value);
                    }}
                    value={adLengths}
                    // required={true}
                  />
                </div>
                <div className="strapy__postAdlabel11">
                  <label>Waist(mm)</label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setAdWaist(e.target.value);
                    }}
                    value={adWaist}
                    // required={true}
                  />
                </div>
                <div className="strapy__postAdlabel11">
                  <label>Size(mm)</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setAdSize(e.target.value);
                    }}
                    value={adSize}
                    // required={true}
                  />
                </div>
              </div>
              <div className="strapy__postAdlabel11">
                {/* <label>Description</label> */}
                <textarea
                  placeholder="Description"
                  onChange={(e) => {
                    setAdDescribe(e.target.value.slice(0, 90));
                  }}
                  value={adDescribe}
                ></textarea>
              </div>
              <div className="strapy__postAdInput11">
                <div className="strapy__postAdlabel11">
                  <label>Price</label>
                  <CurrencyInput
                    id="Ad Price"
                    name="Price"
                    placeholder="Please enter a Price"
                    decimalSeparator="."
                    value={adNairaPrice}
                    // defaultValue={adNairaPrice}
                    decimalsLimit={2}
                    prefix={prefix}
                    onValueChange={handleChange}
                  />
                  {/* <input
                  type="number"
                  onChange={(e) => {
                    setAdNairaPrice(e.target.value);
                  }}
                  value={adNairaPrice}
                  // required={true}
                /> */}
                </div>
                <div className="strapy__postAdlabel11">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setAdPhoneNo(e.target.value.slice(0, 11));
                    }}
                    value={adPhoneNo}
                    // required={true}
                  />
                </div>
              </div>
              <div className="details__btn">
                <button
                  className="uploadBtn"
                  type="submit"
                  onClick={createUser}
                >
                  Submit Details
                </button>
              </div>
              {/* </form> */}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
