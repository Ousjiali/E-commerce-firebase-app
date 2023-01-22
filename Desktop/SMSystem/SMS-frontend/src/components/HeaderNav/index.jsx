import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import personlog from "../../assets/personlog.png";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { userDetails } from "../../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
// import { BiSearchAlt } from "react-icons/bi";

function HeaderNav({ title }) {
  const dispatch = useDispatch();
  // const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(userDetails());
  }, [dispatch]);

  const userDetail = useSelector((state) => state.userDetail);
  const { username } = userDetail;

  const [openModal, setOpenModal] = useState(false);

  const openHandler = () => {
    setOpenModal(true);
  };

  // const current = new Date();
  // const date = `${current.getDate()}/${
  //   current.getMonth() + 1
  // }/${current.getFullYear()}`;

  const current = new Date();

  const month = current.toLocaleString("default", { month: "long" });
  const date = `${month} ${current.getDate()}, ${current.getFullYear()}`;

  return (
    <div className={styles.headerNavContainer}>
      <div className={styles.headerTitle}>
        <div className={styles.headerTitleDate}>
          <h1>{title}</h1>
          <h2>{date}</h2>
        </div>
        <h6>
          Good day {username && username.first_name}! nice to see you Again..
        </h6>
      </div>
      <div className={styles.headerSearch}>
        {/* <input
          type="text"
          placeholder="Search.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
        {/* <BiSearchAlt /> */}
      </div>
      <div className={styles.headerUser}>
        <img src={personlog} alt="User" />
        <h4>{username && username.full_name}</h4>
      </div>

      <div className={styles.headerNotify}>
        <button onClick={openHandler}>
          {/* <MdOutlineNotificationsActive /> */}
        </button>
        {openModal && (
          <Modal
            onClose={() => setOpenModal(false)}
            isVisible={true}
            size="md"
            content={
              <div className={styles.modalYes}>
                <h6>Are you sure you want to LogOut</h6>
                <button className={styles.mobtn1}>No</button>
                <button>Yes</button>
              </div>
            }
          />
        )}
        <p className={styles.colorNotify}></p>
      </div>
    </div>
  );
}

export default HeaderNav;
