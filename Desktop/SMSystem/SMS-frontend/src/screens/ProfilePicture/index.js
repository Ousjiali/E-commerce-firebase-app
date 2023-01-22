import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { profileImage } from "../../redux/action/profilePictureAction";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCameraFill } from "react-icons/bs";
import { useToast, Button } from "@chakra-ui/react";
import { PROFILE_PICTURE_RESET } from "../../redux/constants/profilePictureConstant";
import { userDetails } from "../../redux/action/userAction";

function ProfilePicture() {
  const dispatch = useDispatch();
  const toast = useToast();

  const [profilePicture, setProfilePicture] = useState("");

  const userDetail = useSelector((state) => state.userDetail);
  const { username, success: isSuccess } = userDetail;

  const id = username && username.biodata && username.biodata;
  console.log(username);

  useEffect(() => {
    dispatch(userDetails());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setProfilePicture(
        username && username.biobata && username.biobata.profile_picture
      );
    }
  }, [isSuccess, username]);

  const pictureHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_picture", profilePicture);
    dispatch(profileImage(id, formData));
    console.log(formData);
  };

  const onChangeHandler = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    console.log(file);
  };

  const editProfilePicture = useSelector((state) => state.editProfilePicture);
  const { loading, success, error } = editProfilePicture;

  if (success) {
    toast({
      title: "Notification",
      description: "Upload Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: PROFILE_PICTURE_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Error Uploading",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: PROFILE_PICTURE_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Profile" />

        <div className={styles.profileBox}>
          <div className={styles.profileHeader}>
            <div className={styles.cameraButton}>
              <img src={`${profilePicture}`} alt="" />
              {/* <BsFillCameraFill /> */}
              <label for="profile_pic">
                {" "}
                <BsFillCameraFill />
              </label>
              <input
                type="file"
                id="profile_pic"
                onChange={(e) => onChangeHandler(e)}
                name="profile_picture"
                style={{ display: "none", visibility: "none" }}
                // onClick={pictureHandler}
              />
            </div>

            <div>
              {loading ? (
                <Button
                  isLoading
                  loadingText="Updating..."
                  colorScheme="teal"
                  variant="outline"
                  style={{ height: "3rem" }}
                />
              ) : (
                <button
                  type="submit"
                  onClick={pictureHandler}
                  className={styles.updateButton}
                >
                  Upload Image
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePicture;
