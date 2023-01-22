import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
// import personlog from "../../assets/personlog.png";
import styles from "./styles.module.css";
import { BsFillCameraFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import datas from "../../datas";
// import { Link } from "react-router-dom";
// import { postUsersData } from "../../redux/action/userProfileDataAction";
import { useDispatch, useSelector } from "react-redux";
import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import stateData from "../../stateData";
import { userDetails } from "../../redux/action/userAction";
import { editUserProfile } from "../../redux/action/editUserProfileAction";
import { EDIT_USERPROFILE_RESET } from "../../redux/constants/editUserProfileConstant";
// import { profileImage } from "../../redux/action/profilePictureAction";

function Profile() {
  // let { id } = useParams();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [marital_status, setMarital_status] = useState("");
  const [religion, setReligion] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nationality, setNationality] = useState("");
  const [state_of_origin, setState_of_origin] = useState("");
  const [local_govt, setLocal_govt] = useState("");
  const [permanent_address, setPermanent_address] = useState("");
  const [address, setAddress] = useState("");
  const [phone_no_1, setPhone_no_1] = useState("");
  const [phone_no_2, setPhone_no_2] = useState("");
  const [type, setType] = useState("text");

  const [profilePicture, setProfilePicture] = useState(null);

  const countryData = datas;
  const fonsusStateData = stateData;

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const editprofiledata = {
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      email: email,
      biodata: {
        marital_status: marital_status,
        gender: gender,
        religion: religion,
        birthday: birthday,
        nationality: nationality,
        state_of_origin: state_of_origin,
        local_govt: local_govt,
        address: address,
        phone_no_1: phone_no_1,
        phone_no_2: phone_no_2,
      },
    };
    dispatch(editUserProfile(editprofiledata));
    console.log(editprofiledata);
  };

  const backHandler = () => {
    navigate("/admin/viewprofiledata");
  };

  const editProfileUser = useSelector((state) => state.editProfileUser);
  const { loading, success, error } = editProfileUser;

  const userDetail = useSelector((state) => state.userDetail);
  const { username, success: isSuccess } = userDetail;

  useEffect(() => {
    dispatch(userDetails());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setFirst_name(username && username.first_name);
      setLast_name(username && username.last_name);
      setMiddle_name(username && username.middle_name);
      setEmail(username && username.email);
      setMarital_status(
        username && username.biodata && username.biodata.marital_status
      );
      setGender(username && username.biodata && username.biodata.gender);
      setReligion(username && username.biodata && username.biodata.religion);
      setBirthday(username && username.biodata && username.biodata.birthday);
      setNationality(
        username && username.biodata && username.biodata.nationality
      );
      setState_of_origin(
        username && username.biodata && username.biodata.state_of_origin
      );
      setLocal_govt(
        username && username.biodata && username.biodata.local_govt
      );
      setPermanent_address(
        username && username.biodata && username.biodata.permanent_address
      );
      setAddress(username && username.biodata && username.biodata.address);
      setPhone_no_1(
        username && username.biodata && username.biodata.phone_no_1
      );
      setPhone_no_2(
        username && username.biodata && username.biodata.phone_no_2
      );
    }
  }, [isSuccess, username]);

  console.log(username && username.last_name);

  // if (success) {
  //   setInterval(() => {
  //     navigate("/admin/healthdata");
  //   }, 3000);
  // }

  const imagePage = () => {
    navigate("/admin/profilepicture");
  };

  const nextHandler = () => {
    navigate("/admin/viewhealthdata");
  };
  // };

  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  if (success) {
    toast({
      title: "Notification",
      description: "Profile Edited Successfully",
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
        <HeaderNav title="Profile" />

        <div className={styles.profileBox}>
          <div className={styles.profileHeader}>
            <div className={styles.cameraButton}>
              <img src={profilePicture} alt="" />
              {/* <BsFillCameraFill /> */}
              <label for="profile_pic" onClick={imagePage}>
                {" "}
                <BsFillCameraFill />
              </label>
              <input
                type="file"
                id="profile_pic"
                // onChange={(e) => onChangeHandler(e)}
                name="profile_picture"
                style={{
                  display: "none",
                  visibility: "none",
                  cursor: "pointer",
                }}
              />
              <div className={styles.titleProfile}>
                <p>Edit Profile Bio</p>
              </div>
            </div>
            <div className={styles.profileContent}>
              <div className={styles.submitButton}>
                <button className={styles.backButton} onClick={backHandler}>
                  <BiArrowBack />
                  Back
                </button>
                <button
                  type="submit"
                  className={styles.updateButton}
                  onClick={submitHandler}
                >
                  Update Profile
                </button>
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
                  <label>First Name</label>
                  <input
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Middle Name</label>
                  <input
                    type="text"
                    value={middle_name}
                    onChange={(e) => setMiddle_name(e.target.value)}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Marital Status</label>
                  <select
                    value={marital_status}
                    onChange={(e) => setMarital_status(e.target.value)}
                    required={true}
                  >
                    <option></option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styles.inputBox}>
                  <label>Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required={true}
                  >
                    <option></option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styles.inputBox}>
                  <label>Religion</label>
                  <select
                    value={religion}
                    onChange={(e) => setReligion(e.target.value)}
                    required={true}
                    className={styles.select}
                  >
                    <option></option>
                    <option>Christianity</option>
                    <option>Islam</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className={styles.inputBox}>
                  <label>Date of Birth</label>
                  <input
                    type={type}
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required={true}
                    onFocus={() => setType("date")}
                    onBlur={() => setType("text")}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Select Country</label>
                  <select
                    onChange={(e) => setNationality(e.target.value)}
                    value={nationality}
                    required={true}
                    className={styles.minimal}
                  >
                    <option></option>
                    {countryData &&
                      countryData.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                  </select>
                </div>

                <div className={styles.inputBox}>
                  <label>State Of Origin</label>
                  <select
                    type="text"
                    value={state_of_origin}
                    onChange={(e) => setState_of_origin(e.target.value)}
                    required={true}
                  >
                    <option></option>
                    {fonsusStateData &&
                      fonsusStateData.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.state}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={styles.inputBox}>
                  <label>Local Government</label>
                  <input
                    type="text"
                    value={local_govt}
                    onChange={(e) => setLocal_govt(e.target.value)}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Permanent Address</label>
                  <input
                    type="address"
                    value={permanent_address}
                    onChange={(e) => setPermanent_address(e.target.value)}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Address</label>
                  <input
                    type="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Phone No. 1</label>
                  <input
                    type="tel"
                    value={phone_no_1}
                    onChange={(e) =>
                      setPhone_no_1(e.currentTarget.value.slice(0, 11))
                    }
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Phone No. 2</label>
                  <input
                    type="tel"
                    value={phone_no_2}
                    onChange={(e) =>
                      setPhone_no_2(e.currentTarget.value.slice(0, 11))
                    }
                    required={true}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={styles.nextButton} onClick={nextHandler}>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
