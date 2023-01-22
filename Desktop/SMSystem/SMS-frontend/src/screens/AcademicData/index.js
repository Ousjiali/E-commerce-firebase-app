import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { BiArrowBack } from "react-icons/bi";
import { Button, Center, CircularProgress, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { editUserProfile } from "../../redux/action/editUserProfileAction";
import { MdHistoryEdu } from "react-icons/md";
import { EDIT_USERPROFILE_RESET } from "../../redux/constants/editUserProfileConstant";
import { userDetails } from "../../redux/action/userAction";

function AcademicData() {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [institution, setInstitution] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [qualification_earned, setQualification_earned] = useState("");
  const [type, setType] = useState("text");

  const submitHandler = (e) => {
    e.preventDefault();
    const academicdata = {
      biodata: {
        academic_history: [
          {
            institution: institution,
            start_date: start_date,
            end_date: end_date,
            qualification_earned: qualification_earned,
          },
        ],
      },
    };
    dispatch(editUserProfile(academicdata));
    console.log(academicdata);
  };

  const editProfileUser = useSelector((state) => state.editProfileUser);
  const { loading, success, error } = editProfileUser;

  useEffect(() => {
    dispatch(userDetails());
  }, [dispatch]);

  const userDetail = useSelector((state) => state.userDetail);
  const { username, success: isSuccess } = userDetail;

  useEffect(() => {
    if (isSuccess) {
      setInstitution(
        username &&
          username.biodata &&
          username.biodata.academic_history[0].institution
      );
      setStart_date(
        username &&
          username.biodata &&
          username.biodata.academic_history[0].start_date
      );
      setEnd_date(
        username &&
          username.biodata &&
          username.biodata.academic_history[0].end_date
      );
      setQualification_earned(
        username &&
          username.biodata &&
          username.biodata.academic_history[0].qualification_earned
      );
    }
  }, [isSuccess, username]);

  const backHandler = () => {
    navigate("/admin/viewacademicdata");
  };

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    toast({
      title: "Notification",
      description: "Academic Data Updated",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: EDIT_USERPROFILE_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Invalid Credentials",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: EDIT_USERPROFILE_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Academic History" />

        <div className={styles.profileBox}>
          <div className={styles.profileHeader}>
            <div className={styles.staffCount}>
              <div className={styles.staffDetails}>
                <div className={styles.staffIcon}>
                  <MdHistoryEdu />
                </div>
                <h1>|</h1>
              </div>
              <div className={styles.titleProfile}>
                <p>Edit Academic History</p>
              </div>
            </div>
            <div className={styles.profileContent}>
              <div className={styles.submitButton}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={backHandler}
                >
                  <BiArrowBack />
                  Back
                </button>

                {loading ? (
                  <Button
                    isLoading
                    loadingText="Validating Credentials..."
                    colorScheme="green"
                    variant="outline"
                    style={{ height: "5rem" }}
                  />
                ) : (
                  <button
                    type="submit"
                    className={styles.subButton}
                    onClick={submitHandler}
                  >
                    Update Academic History
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            {loading ? (
              <Center>
                <CircularProgress isIndeterminate color="green.500" />
              </Center>
            ) : (
              <div className={styles.inputField}>
                <div className={styles.inputBox}>
                  <label>Institution</label>
                  <input
                    type="text"
                    onChange={(e) => setInstitution(e.target.value)}
                    value={institution}
                    // required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Start Date</label>
                  <input
                    type={type}
                    onChange={(e) => setStart_date(e.target.value)}
                    value={start_date}
                    // required={true}
                    onFocus={() => setType("date")}
                    onBlur={() => setType("text")}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>End Data</label>
                  <input
                    type={type}
                    onChange={(e) => setEnd_date(e.target.value)}
                    value={end_date}
                    required={true}
                    onFocus={() => setType("date")}
                    onBlur={() => setType("text")}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Qualification Earned</label>
                  <select
                    onChange={(e) => setQualification_earned(e.target.value)}
                    value={qualification_earned}
                    required={true}
                    className={styles.academicHistorySelect}
                  >
                    <option></option>
                    <option>JSSCE</option>
                    <option>SSCE</option>
                    <option>Bachelors</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className={styles.inputBox}>
                  <button>
                    <Link to="/admin/viewfamilydata">
                      <p>Next</p>
                    </Link>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicData;
