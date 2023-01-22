import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
// import { getNoticeId } from "../../redux/action/editNoticeAction";
import { getNotice, postNotice } from "../../redux/action/noticeBoardAction";
import { getScope } from "../../redux/action/scopeAction";
import { POST_NOTICE_RESET } from "../../redux/constants/noticeBoardConstant";
import styles from "./styles.module.css";

function NoticeBoard() {
  const dispatch = useDispatch();
  const toast = useToast();

  // let { id } = useParams();

  const [title, setTitle] = useState("");
  const [scope, setScope] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const noticeData = {
      title: title,
      message: message,
      scope: scope,
    };
    dispatch(postNotice(noticeData));
  };

  const noticeBoard = useSelector((state) => state.noticeBoard);
  const { loading, success, error } = noticeBoard;

  useEffect(() => {
    dispatch(getNotice());
  }, [dispatch]);

  const noticeGet = useSelector((state) => state.noticeGet);
  const { allNotice } = noticeGet;

  // useEffect(() => {
  //   dispatch(getNoticeId(id));
  // }, [dispatch, id]);

  // const getNoticeById = useSelector((state) => state.getNoticeById);
  // const { results = {} } = getNoticeById;
  // console.log(results);

  useEffect(() => {
    dispatch(getScope());
  }, [dispatch]);

  const scopeId = useSelector((state) => state.scopeId);
  const { getScopeId } = scopeId;
  console.log(getScopeId);

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    dispatch(getNotice());
  }

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
    dispatch({ type: POST_NOTICE_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Invalid Credentials",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: POST_NOTICE_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Notice Board" />
        <div className={styles.dashboardContent}>
          <div className={styles.dashboardNotice}>
            <div className={styles.noticeTitle}>
              <span>Notice Board</span>
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
              <div className={styles.scopeBtn}>
                <Link to="/admin/scope">
                  <button>Create Scope</button>
                </Link>
              </div>
              <div className={styles.noticeManageBtn}>
                <Link to="/admin/managenotice">
                  <buttonn type="button" className={styles.manageBtn}>
                    Manage Notice
                  </buttonn>
                </Link>
              </div>
              <Link to="/admin/notice/information">
                <button className={styles.infoBtn} type="button">
                  Information
                </button>
              </Link>
            </div>
            <div className={styles.dashboardNoticeForm}>
              <div className={styles.noticeFormTitle}>
                <span>Create Notice</span>
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

export default NoticeBoard;
