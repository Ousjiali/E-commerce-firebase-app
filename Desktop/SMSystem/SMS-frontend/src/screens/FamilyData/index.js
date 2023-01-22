import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { Button, Center, CircularProgress, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUserProfile } from "../../redux/action/editUserProfileAction";
import { EDIT_USERPROFILE_RESET } from "../../redux/constants/editUserProfileConstant";
import { userDetails } from "../../redux/action/userAction";

function FamilyData() {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [next_of_kin_full_name, setNext_of_kin_full_name] = useState("");
  const [next_of_kin_phone_no_1, setNext_of_kin_phone_no_1] = useState("");
  const [next_of_kin_phone_no_2, setNext_of_kin_phone_no_2] = useState("");
  const [next_of_kin_address, setNext_of_kin_address] = useState("");
  const [guardian_full_name, setGuardian_full_name] = useState("");
  const [guardian_phone_no_1, setGuardian_phone_no_1] = useState("");
  const [guardian_phone_no_2, setGuardian_phone_no_2] = useState("");
  const [guardian_address, setGuardian_address] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const familydata = {
      biodata: {
        family_data: {
          next_of_kin_full_name: next_of_kin_full_name,
          next_of_kin_phone_no_1: next_of_kin_phone_no_1,
          next_of_kin_phone_no_2: next_of_kin_phone_no_2,
          next_of_kin_address: next_of_kin_address,
          guardian_full_name: guardian_full_name,
          guardian_phone_no_1: guardian_phone_no_1,
          guardian_phone_no_2: guardian_phone_no_2,
          guardian_address: guardian_address,
        },
      },
    };
    dispatch(editUserProfile(familydata, toast));
    console.log(familydata);
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
      setNext_of_kin_full_name(
        username &&
          username.biodata &&
          username.biodata.family_data.next_of_kin_full_name
      );
      setNext_of_kin_phone_no_1(
        username &&
          username.biodata &&
          username.biodata.family_data.next_of_kin_phone_no_1
      );
      setNext_of_kin_phone_no_2(
        username &&
          username.biodata &&
          username.biodata.family_data.next_of_kin_phone_no_2
      );
      setNext_of_kin_address(
        username &&
          username.biodata &&
          username.biodata.family_data.next_of_kin_address
      );
      setGuardian_full_name(
        username &&
          username.biodata &&
          username.biodata.family_data.guardian_full_name
      );
      setGuardian_phone_no_1(
        username &&
          username.biodata &&
          username.biodata.family_data.guardian_phone_no_1
      );
      setGuardian_phone_no_2(
        username &&
          username.biodata &&
          username.biodata.family_data.guardian_phone_no_2
      );
      setGuardian_address(
        username &&
          username.biodata &&
          username.biodata.family_data.guardian_address
      );
    }
  }, [isSuccess, username]);

  const backHandler = () => {
    navigate("/admin/viewfamilydata");
  };

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    toast({
      title: "Notification",
      description: "Family Data Updated",
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
        <HeaderNav title="Family Data" />

        <div className={styles.profileBox}>
          <div className={styles.profileHeader}>
            <div className={styles.staffCount}>
              <div className={styles.staffDetails}>
                <div className={styles.staffIcon}>
                  <MdOutlineFamilyRestroom />
                </div>
                <h1>|</h1>
              </div>
              <div className={styles.titleProfile}>
                <p>Edit Family Data</p>
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
                    colorScheme="teal"
                    variant="outline"
                    style={{ height: "3rem" }}
                  />
                ) : (
                  <button
                    type="submit"
                    className={styles.subButton}
                    onClick={submitHandler}
                  >
                    Updata Family Data
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            {loading ? (
              <Center>
                <CircularProgress isIndeterminate color="purple.500" />
              </Center>
            ) : (
              <div className={styles.inputField}>
                <div className={styles.inputBox}>
                  <label>Next of Kin Full Name</label>
                  <input
                    type="text"
                    onChange={(e) => setNext_of_kin_full_name(e.target.value)}
                    value={next_of_kin_full_name}
                    // required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Next of Kin Phone Number</label>
                  <input
                    type="tel"
                    onChange={(e) =>
                      setNext_of_kin_phone_no_1(
                        e.currentTarget.value.slice(0, 11)
                      )
                    }
                    value={next_of_kin_phone_no_1}
                    // required={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Next of Kin Phone 2</label>
                  <input
                    type="tel"
                    onChange={(e) =>
                      setNext_of_kin_phone_no_2(
                        e.currentTarget.value.slice(0, 11)
                      )
                    }
                    value={next_of_kin_phone_no_2}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Next of Kin Address</label>
                  <input
                    type="text"
                    onChange={(e) => setNext_of_kin_address(e.target.value)}
                    value={next_of_kin_address}
                    // required={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Guardian Full Name</label>
                  <input
                    type="text"
                    onChange={(e) => setGuardian_full_name(e.target.value)}
                    value={guardian_full_name}
                    // required={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Guardian Phone Number</label>
                  <input
                    type="tel"
                    onChange={(e) =>
                      setGuardian_phone_no_1(e.currentTarget.value.slice(0, 11))
                    }
                    value={guardian_phone_no_1}
                    // required={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Guardian Phone Number 2</label>
                  <input
                    type="tel"
                    onChange={(e) =>
                      setGuardian_phone_no_2(e.currentTarget.value.slice(0, 11))
                    }
                    value={guardian_phone_no_2}
                    // required={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Guardian Address</label>
                  <input
                    type="address"
                    onChange={(e) => setGuardian_address(e.target.value)}
                    value={guardian_address}
                    // required={true}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FamilyData;
