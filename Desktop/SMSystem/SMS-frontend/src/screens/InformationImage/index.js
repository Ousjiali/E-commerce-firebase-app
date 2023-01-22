import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import { getNotice } from "../../redux/action/noticeBoardAction";
import { informationImage } from "../../redux/action/noticeInformationAction";
import { IMAGE_INFORMATION_RESET } from "../../redux/constants/noticeInformationConstant";
import styles from "./styles.module.css";

function InformationImage() {
  const dispatch = useDispatch();
  const toast = useToast();

  const [information, setInformation] = useState("");
  const [images, setImages] = useState(null);
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("information", information);
    formData.append("image", images);
    formData.append("description", message);
    dispatch(informationImage(formData));
    console.log(formData);
  };

  const onChangeHandler = (e) => {
    const file = e.target.files[0];
    setImages(file);
  };
  const postImageInfo = useSelector((state) => state.postImageInfo);
  const { loading, success, error } = postImageInfo;

  useEffect(() => {
    dispatch(getNotice());
  }, [dispatch]);

  const noticeGet = useSelector((state) => state.noticeGet);
  const { allNotice } = noticeGet;

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    setMessage("");
    setImages("");
    toast({
      title: "Notification",
      description: "Information Image Added",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: IMAGE_INFORMATION_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Invalid Credentials",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: IMAGE_INFORMATION_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Information Image" />
        <div className={styles.dashboardContent}>
          <div className={styles.dashboardNotice}>
            <div className={styles.noticeTitle}>
              <span>Information Board</span>
            </div>
            {allNotice &&
              allNotice.map((item, i) => (
                <div key={i} className={styles.noticeContent}>
                  <h2>{item.timestamp}</h2>
                  <h4>{item.title}</h4>
                  <h5 className={styles.noticeComment}>{item.message}</h5>
                </div>
              ))}
          </div>
          <div className={styles.noticeFormContainer}>
            <div className={styles.noticeButton}>
              <Link to="/admin/notice/information">
                <button className={styles.infoBtn} type="button">
                  Back
                </button>
              </Link>
            </div>
            <div className={styles.dashboardNoticeForm}>
              <div className={styles.noticeFormTitle}>
                <span>Create Information</span>
              </div>
              {loading ? (
                <Center>
                  <CircularProgress isIndeterminate color="red.500" />
                </Center>
              ) : (
                <div className={styles.noticeInputField}>
                  <div className={styles.inputBox}>
                    <label>Information</label>
                    <select
                      onChange={(e) => setInformation(e.target.value)}
                      value={information}
                    >
                      <option></option>
                      <option>1</option>
                      <option>2</option>
                    </select>
                  </div>
                  <div className={styles.inputBox}>
                    <label>Upload Image</label>
                    <input
                      type="file"
                      onChange={(e) => onChangeHandler(e)}
                      name="images"
                    />
                  </div>

                  <div className={styles.inputBox}>
                    <label>Post Description</label>
                    <textarea
                      type="text"
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      required={true}
                    />
                  </div>

                  <div className={styles.noticeSubmitBtn}>
                    <button
                      type="submit"
                      className={styles.noticeBtn}
                      onClick={submitHandler}
                    >
                      Publish
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationImage;
