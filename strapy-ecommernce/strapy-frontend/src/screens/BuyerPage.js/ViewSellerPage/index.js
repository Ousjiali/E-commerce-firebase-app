import { collection, getDocs } from "firebase/firestore";
// import { list } from "firebase/storage";
import React from "react";
import { db } from "../../../firebase";

import "./viewSellerPage.css";
import { Link } from "react-router-dom";
// import HeaderLink from "../../../components/HeaderLink";
import StrapySlider from "../../../components/StrapySlider/StrapySlider";
import BackToTop from "../../../components/BackToTop/BackToTop";

const ViewSellerPage = () => {
  const [data, setData] = React.useState([]);

  // const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapShot = await getDocs(collection(db, "users"));
        // .orderBy("created", "desc")
        // .limit(3);
        querySnapShot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        // setIsList(list);
        console.log(list);
      } catch (error) {
        alert("Error in Getting Users");
      }
    };
    fetchData();
  }, []);

  console.log("data:", data);

  // const imageUrl = data && data[0];
  // console.log("imageUrl:", imageUrl);
  const filterItems = data.filter((dataList) => {
    return dataList.category === "Men";
  });
  console.log(filterItems);

  return (
    <>
      {/* <HeaderLink /> */}
      <main className="home">
        <StrapySlider />
        <div className="home-wrap content-wrap">
          <div className="product-category-wrap">
            {data?.map((item, i) => {
              return (
                <div key={i} className="strapy__displayUserContent">
                  <div className="strapy__displayContainer">
                    <div className="strapy__displayUserImg">
                      {/* {item.imageList.map((imageUrl, a) => ( */}
                      <img src={item?.imageList[0]} alt="See Product" />
                      {/* ))} */}
                    </div>
                    <div className="strapy__displayUserDetails">
                      <div className="eachGridbox__allContent">
                        {/* <header>Product Name:</header> */}
                        <span className="grid__titleContent">
                          <p className="grid__titleName">{item.productName}</p>
                        </span>
                      </div>
                      <div className="eachGridbox__allContent">
                        {/* <header>Price:</header> */}
                        <span className="grid__titleContent">
                          <p className="grid__titleName">
                            ₦{item.adNairaPrice}
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className="buyNow__btnContainer">
                      <Link to={`/view/product/details/${item.id}`}>
                        <button className="buyNow__btn">Buy Now</button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* {data?.map((item, i) => {
          return (
            <div key={i}>
              {item.category}, {item.categories}
            </div>
          );
          //   <img src={item.imageList} alt="Pictures User"/>
        })} */}
        </div>
      </main>
      <BackToTop />
    </>
  );
};

export default ViewSellerPage;
