import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import {
  getInformation,
  postInformation,
} from "../../redux/action/noticeInformationAction";
import { getScope } from "../../redux/action/scopeAction";
import { POST_INFORMATION_RESET } from "../../redux/constants/noticeInformationConstant";
import styles from "./styles.module.css";

function NoticeInformation() {
  const dispatch = useDispatch();
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [scope, setScope] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", message);
    formData.append("scope", scope);
    dispatch(postInformation(formData));
    console.log(formData);
  };

  const postInfo = useSelector((state) => state.postInfo);
  const { loading, success, error } = postInfo;

  useEffect(() => {
    dispatch(getInformation());
  }, [dispatch]);

  const getInformationImage = useSelector((state) => state.getInformationImage);
  const { getInforImage } = getInformationImage;
  console.log(getInforImage && getInforImage);

  useEffect(() => {
    dispatch(getScope());
  }, [dispatch]);

  const scopeId = useSelector((state) => state.scopeId);
  const { getScopeId } = scopeId;
  //   console.log(getScopeId);

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    setTitle("");
    setMessage("");
    setScope("");
    toast({
      title: "Notification",
      description: "Notice Successfully Added",
      status: "success",
      duration: 7000,
      isClosable: true,
    });
    dispatch({ type: POST_INFORMATION_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Invalid Credentials",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: POST_INFORMATION_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Information Board" />
        <div className={styles.dashboardContent}>
          <div className={styles.dashboardNotice}>
            <div className={styles.noticeTitle}>
              <span>Information Board</span>
            </div>
            {getInforImage &&
              getInforImage.map((item, i) => (
                <div key={i} className={styles.noticeContent}>
                  <h2>{item.timestamp}</h2>
                  <h4>{item.title}</h4>
                  <h4>
                    {item.images.map((image, x) => (
                      <div key={x}>
                        <img src={image.image} alt="Information Blog" />
                      </div>
                    ))}
                  </h4>
                  <h5 className={styles.noticeComment}>{item.body}</h5>
                </div>
              ))}
          </div>
          <div className={styles.noticeFormContainer}>
            <div className={styles.noticeButton}>
              <Link to="/admin/notice/informationimage">
                <button className={styles.infoBtn} type="button">
                  Information Image
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
                    <label>Title</label>
                    <input
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      required={true}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Student Scope</label>
                    <select
                      type="text"
                      onChange={(e) => setScope(e.target.value)}
                      value={scope}
                      required={true}
                    >
                      <option></option>
                      {getScopeId &&
                        getScopeId.map((item, i) => (
                          <option key={i} value={item.id}>
                            {item.id}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className={styles.inputBox}>
                    <label>Post Content</label>
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

export default NoticeInformation;
