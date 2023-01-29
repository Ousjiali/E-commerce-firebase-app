import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { Link, useParams } from "react-router-dom";
// import HeaderLink from "../../../../components/HeaderLink";
import { db } from "../../../../firebase";
import "./productById.css";

const ProductById = () => {
  let { id } = useParams();

  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    const fetchDocById = async () => {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser({
          ...docSnap.data(),
        });
      } else {
        setUser({});
      }
    };
    fetchDocById();
  }, [id]);

  console.log(user);

  const detailsData = user && user.imageList ? user.imageList : [];
  console.log(detailsData[0]);

  return (
    <div>
      {/* <HeaderLink /> */}
      <div className="strapy__displayContanier">
        <div className="strapy__displayProductId">
          <div className="strapy__displayPic">
            <img src={detailsData[0]} alt="Product Pic" />
          </div>
          <div className="strapy__displayLine">
            <hr></hr>
          </div>
          <div className="strapy__displayPicrole">
            {detailsData?.map((item, i) => (
              <img key={i} src={item} alt="Product Pic" />
            ))}
          </div>
          <div className="strapy__displayLine">
            <hr></hr>
          </div>
          <div className="starpy__displayContent">
            <div className="strapyGridbox__allContent">
              <header>Product Name:</header>
              <span className="strapyGrid__titleContent">
                <p className="strapyGrid__titleName">{user.productName}</p>
              </span>
            </div>
            <div className="strapyGridbox__allContent">
              <header>Category:</header>
              <span className="strapyGrid__titleContent">
                <p className="strapyGrid__titleName">{user.category}</p>
              </span>
            </div>

            <div className="strapyGridbox__allContent">
              <header>Lenght(mm):</header>
              <span className="strapyGrid__titleContent">
                <p className="strapyGrid__titleName">{user.adLengths}</p>
              </span>
            </div>

            <div className="strapyGridbox__allContent">
              <header>Size:</header>
              <span className="strapyGrid__titleContent">
                <p className="strapyGrid__titleName">{user.adSize}</p>
              </span>
            </div>
            <div className="strapyGridbox__allContent">
              <header>Location:</header>
              <span className="strapyGrid__titleContent">
                <p className="strapyGrid__titleName">{user.region}</p>
              </span>
            </div>
            <div className="strapyGridbox__allContent">
              <header>Seller Phone:</header>
              <span className="strapyGrid__titleContent">
                <p className="strapyGrid__titleName">{user.adPhoneNo}</p>
              </span>
            </div>
          </div>
        </div>
        <div className="strapy__displayContent2">
          <div className="strapy__displayCheckOut">
            <div className="strapy__displaycheck">
              <span>Procceed to CheckOut</span>
              <h2>₦{user.adNairaPrice}</h2>
              <Link to={`/buyer/register/page/${id}`}>
                <button>Ckeck Out</button>
              </Link>
            </div>
          </div>
          <div className="strapy__displayRight">
            <div className="strapyGridbox__allContent">
              <header>Product Condition:</header>
              <span className="strapyGrid__titleContent">
                <p className="strapyGrid__titleName">{user.adCondition}</p>
              </span>
            </div>
            <div className="strapyGridbox__allContent">
              <header>Material:</header>
              <span className="strapyGrid__titleContent">
                <p className="strapyGrid__titleName">{user.adMaterial}</p>
              </span>
            </div>
            <div className="strapyGridbox__allContent">
              <header>Category Item:</header>
              <span className="strapyGrid__titleContent">
                <p className="strapyGrid__titleName">{user.categories}</p>
              </span>
            </div>
            <div className="strapyGridbox__allContent">
              <header>Description:</header>
              <span className="strapyGrid__titleContent">
                <p className="strapyGrid__titleName">{user.adDescribe}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductById;
