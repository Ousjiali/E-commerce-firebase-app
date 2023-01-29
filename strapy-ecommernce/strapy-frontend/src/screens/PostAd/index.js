import React from "react";
import "./postAd.css";
import { useNavigate } from "react-router-dom";
// import { storage } from "../../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  // listAll,
  deleteObject,
  getStorage,
} from "firebase/storage";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { TiDelete } from "react-icons/ti";
import { useFormContext } from "../../context/PostAdContext";
import { v4 } from "uuid";
import Spinner from "../../components/Spinner";
// import { onSnapshot } from "firebase/firestore";

export const PostAd = () => {
  const [loading, setLoading] = React.useState(false);
  const [genderData, setGenderData] = React.useState("");

  const {
    category,
    setCategory,
    region,
    setRegion,
    categories,
    setCategories,
    imageList,
    setImageList,
    productName,
    setProductName,
  } = useFormContext();

  console.log(categories);

  // const [percentage, setPrecentage] = React.useState(null);
  const navigate = useNavigate();

  const categoryData = [
    {
      id: 1,
      gender: "Men",
    },
    {
      id: 2,
      gender: "Women",
    },
    {
      id: 3,
      gender: "Kids",
    },
  ];

  const product = [
    {
      id: 1,
      gender: "Men",
      productName: "Yezzy",
      category: "Jeans",
    },
    {
      id: 2,
      gender: "Men",
      productName: "Nike",
      category: "Polo",
    },
    {
      id: 3,
      gender: "Women",
      productName: "Addias",
      category: "Sexy Blouse",
    },
    {
      id: 4,
      gender: "Women",
      productName: "Fashion Nova",
      category: "Jeggings",
    },
    {
      id: 5,
      gender: "Kids",
      productName: "Fashion Nova",
      category: "Kiddys Top",
    },
    {
      id: 6,
      gender: "Kids",
      productName: "Fashion Focus",
      category: "Kiddys Shoe",
    },
  ];

  const categoryHandler = (e) => {
    setCategory(e.target.value);
    setGenderData(
      product &&
        product.filter((item) => {
          return item.gender === e.target.value;
        })
    );
  };

  const stateLocation = [
    {
      id: 1,
      localState: "Lagos",
    },
    {
      id: 2,
      localState: "Abuja",
    },
  ];

  const [uploadFile, setUploadFile] = React.useState(null);

  const storage = getStorage();

  // const [imageList, setImageList] = React.useState([]);

  const imageListRef = ref(storage, "images/");

  const fileUrl = () => {
    // const name = new Date().getTime() + uploadFile.name;
    if (uploadFile == null) return;
    const imageRef = ref(storage, `images/${uploadFile.name + v4()}`);
    setLoading(true);
    uploadBytes(imageRef, uploadFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((allImages) => [...allImages, url]);
      });
      setLoading(false);
    });
  };
  console.log(uploadFile);

  const deleteImgHandler = (url) => {
    const deleteListRef = ref(storage, url);
    deleteObject(deleteListRef)
      .then(() => {
        // setImages(imageList.filter((image) => image !== url));
        alert("Image deleted successfully");
        return window.location.reload(true);
      })
      .catch(() => {
        alert("Error deleting Image");
      });
  };

  const nextHandler = () => {
    navigate("/details/postad");
  };

  return (
    <div className="strapy__postAd">
      <div className="strapy__postAdContainer">
        {/* <form onSubmit={submitHandler}> */}
        <div className="strapy__postHeadline">
          <h3>Add New Item</h3>
        </div>
        <div className="strapy__postAdInput2">
          <div className="strapy__postAdlabel">
            <label>Category</label>
            <select
              onChange={categoryHandler}
              value={category}
              // required={true}
            >
              <option></option>
              {categoryData &&
                categoryData?.map((item, i) => (
                  <option key={i} value={item.gender}>
                    {item.gender}
                  </option>
                ))}
            </select>
          </div>
          <div className="strapy__postAdlabel">
            <label>Category Items</label>
            {/* <select
              onChange={(e) => setCategories(e.target.value)}
              value={categories}
              // required={true}
            >
              <option></option>
              {genderData &&
                genderData.map((item, i) => (
                  <option key={i} vaule={item.id}>
                    {item.category}
                  </option>
                ))}
            </select> */}
            <input
              type="text"
              onChange={(e) => setCategories(e.target.value)}
              value={categories}
            />
          </div>
          <div className="strapy__postAdlabel">
            <label>Select Location</label>
            <select
              onChange={(e) => setRegion(e.target.value)}
              value={region}
              // required={true}
            >
              <option></option>
              {stateLocation &&
                stateLocation?.map((item, i) => (
                  <option key={i} value={item.localState}>
                    {item.localState}
                  </option>
                ))}
            </select>
          </div>
          <div className="strapy__postAdlabel">
            <label>Product Name</label>
            <input
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              // required={true}
            />
          </div>
        </div>
        <div className="strapy__uploadFile">
          <input
            accept="image/*"
            type="file"
            onChange={(e) => {
              setUploadFile(e.target.files[0]);
            }}
          />
          {loading ? (
            <Spinner />
          ) : (
            <button className="" onClick={fileUrl}>
              Upload
            </button>
          )}
        </div>
        <div className="strapy__imagePic">
          {imageList.map((url, i) => {
            return (
              <div key={i} className="strapy__deleteImg">
                <img src={url} alt="ImageLogo" />
                <TiDelete onClick={() => deleteImgHandler(url)} />
              </div>
            );
          })}
        </div>
        <div className="stb__BtnContainer">
          <button
            type="submit"
            className="stb__Btn"
            onClick={nextHandler}
            // disabled={percentage !== null && percentage < 100}
          >
            Next
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

// React.useEffect(() => {
//   const uploadFile = () => {
//     const name = new Date().getTime() + file.name;
//     console.log(name);
//     const storageRef = ref(storage, file.name);
//     const uploadTask = uploadBytesResumable(storageRef, file);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setPrecentage(progress);
//         console.log("Upload is " + progress + "% done");
//         switch (snapshot.state) {
//           case "paused":
//             console.log("Upload is Paused");
//             break;
//           case "running":
//             console.log("Upload is Running");
//             break;
//           default:
//             break;
//         }
//       },
//       (error) => {
//         console.log(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setDataForm((dataForm) => ({ ...dataForm, img: downloadURL }));
//           setImageUrl(downloadURL);
//         });
//       }
//     );
//   };
//   file && uploadFile();
// }, [file]);

// const createUser = (e) => {
//   // setUserData(dataForm);

// };

// if (usableUrl.includes(".png")) {
//   usableUrl = usableUrl.split(".png")[0] + ".png";
// }
// if (usableUrl.includes(".jpg")) {
//   usableUrl = usableUrl.split(".jpg")[0] + ".jpg";
// }
// if (usableUrl.includes(".jpeg")) {
//   usableUrl = usableUrl.split(".jpeg")[0] + ".jpeg";
// }

// const deleteListRef = ref(storage, `images/${imageList.files + v4()}`);

// <img
//           src={
//             file
//               ? URL.createObjectURL(file)
//               : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//           }
//           alt="Load Pic"
//         />

// {
//   nextHandler ? nextHandler : return []
// }

// split the url using the base url to get the part with the file name
// const formattedUrl = url.split(
//   "https://firebasestorage.googleapis.com/v0/b/strapy-project.appspot.com/o/images%2F"
// )[1];
// remove url queries from the formattedUrl. This is the file name
// let usableUrl = formattedUrl.split("?")[0];
// const deleteListRef = ref(storage, `images/${usableUrl}`);
// const deleteListRef = ref(storage, `images%2F${usableUrl}`);
