import React from "react";
import "./CardMen.scss";
import { Link, useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const CardMen = ({ item }) => {
  let { id } = useParams();
  const [data, setData] = React.useState([]);
  //   const [loading, setLoading] = React.useState(false);

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

  const filterItems = data.filter((dataList) => {
    return dataList.category === "Men";
  });
  console.log(filterItems);

  return (
    <>
      {filterItems?.map((item, i) => {
        return (
          <div className="cardContainer" key={i}>
            <Link
              className="link"
              to={`/view/product/details/${item.id}`}
              key={i}
            >
              <div className="card">
                <div className="image">
                  <img src={item?.imageList[0]} alt="" className="mainImg" />
                  <img src={item?.imageList[1]} alt="" className="secondImg" />
                </div>
                <h2>{item?.productName}</h2>
                <div className="prices">
                  <h3> ₦{item.adNairaPrice}</h3>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default CardMen;
