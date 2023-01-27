import { sp } from "@pnp/sp";
import * as React from "react";
import Input from "../../../../Container/Form";
import ImageUpload from "../../../../Container/Form/ImageInput";
import "@pnp/sp/site-users/web";
import Select from "../../../../Container/Form/select";
import swal from "sweetalert";
import TextArea from "../../../../Container/Form/TextArea";
import { AiOutlineArrowRight } from "react-icons/ai";
import {
  countries,
  genderOptions,
  maritalOptions,
  states,
} from "../../../../Container/Helpers";
import { RiAttachment2 } from "react-icons/ri";
import { getUserProfileData } from "../../../../hooks/useUserProfileData";
import "../profile.css";
import { WebContext } from "../../../../LbanOnboardingApp";

import { CircularProgress } from "@material-ui/core";
import { useFormContextData } from "../../../../Context";
import uuid from "react-uuid";

export const BioData = () => {
  const { context } = React.useContext(WebContext);
  const { data } = getUserProfileData();
  const [disableEdit, setDisableEdit] = React.useState(false);
  const [appendUUid, setAppendUid] = React.useState("");
  const {
    bioData,
    setBioData,
    nextPage,
    profilePhoto,
    setProfilePhoto,
    setEmployeeEmail,
    employeeEmail,
    employeeName,
    setEmployeeName,
  } = useFormContextData();

  console.log(bioData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBioData({ ...bioData, [name]: value });
  };

  React.useEffect(() => {
    setAppendUid(uuid().substring(0, 6));
  }, []);

  setEmployeeName(data?.DisplayName);
  setEmployeeEmail(data?.Email);

  React.useEffect(() => {
    setLoading(true);
    sp.profiles.myProperties.get().then((res) => {
      sp.web.lists
        .getByTitle("StaffProfile")
        .items.filter(`StaffEmail eq '${res?.Email}'`)
        .get()
        .then((response) => {
          if (response.length > 0) {
            const profileStatus = response[0].ProfileStatus;
            if (profileStatus === "Approved") {
              setDisableEdit(true);
            }
            setProfilePhoto(response[0].ProfilePhoto);
            const staffData = JSON.parse(response[0].Biodata);
            setBioData(staffData);
          }

          setLoading(false);
        });
    });
  }, []);

  const [loading, setLoading] = React.useState(false);
  const [upload, setUpload] = React.useState(false);

  const nextHandler = () => {
    if (bioData?.preferredName === "") {
      swal("Warning!", "Kindly upload an image!", "error");
    } else {
      nextPage();
    }
  };

  const photoHandler = (e) => {
    const pix = e.target.files[0];
    setUpload(true);

    sp.web
      .getFolderByServerRelativeUrl("StaffPhoto")
      .files.add(`${appendUUid}${pix.name}`, pix, true)
      .then((result) => {
        result.file.listItemAllFields.get().then((listItemAllFields) => {
          setProfilePhoto(
            `${context.pageContext.web.absoluteUrl}/StaffPhoto/${appendUUid}${pix.name}`
          );
          setUpload(false);
        });
      })
      .catch((e) => {
        setUpload(false);
        swal("Warning!", "File Upload Failed", "error");
        console.log(e.response);
      });
  };

  return (
    <div className="Displayflex">
      <h3>Employees Personal Information Form </h3>
      <p>
        Our employment process requires that a person employed in this
        establishment should complete an employee information form.
      </p>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CircularProgress
            size={40}
            style={{
              color: "purple",
            }}
          />
        </div>
      ) : (
        <form>
          <div className="formContainer" style={{ marginTop: "4%" }}>
            <div>
              <Input
                onChange={(e) => setEmployeeName(e.target.value)}
                value={data?.DisplayName}
                type={"text"}
                title={"Employee Full Name"}
                size={"maxi"}
                required={true}
                disabled={true}
              />
              <Input
                name={"preferredName"}
                type={"text"}
                title={"Preferred Name"}
                size={"maxi"}
                required={true}
                value={bioData ? bioData["preferredName"] : ""}
                onChange={handleChange}
                disabled={disableEdit}
              />
              <Input
                type={"number"}
                title={"Phone"}
                size={"maxi"}
                name="phone"
                value={bioData ? bioData["phone"] : ""}
                onChange={handleChange}
                required={true}
                disabled={disableEdit}
              />
            </div>
            <div>
              <Input
                onChange={(e) => setEmployeeEmail(e.target.value)}
                value={data?.Email}
                type={"text"}
                title={"Email Address"}
                size={"maxi"}
                required={true}
                disabled={true}
              />
              <Input
                name={"DOB"}
                type={"date"}
                title={"Date of Birth"}
                size={"maxi"}
                value={bioData ? bioData["DOB"] : ""}
                onChange={handleChange}
                required={true}
                disabled={disableEdit}
              />
              <div className="divided">
                <Select
                  options={genderOptions}
                  title={"Gender"}
                  size={"midi"}
                  name="gender"
                  required={true}
                  value={bioData ? bioData["gender"] : ""}
                  onChange={handleChange}
                  disabled={disableEdit}
                />
                <Select
                  options={maritalOptions}
                  name={"maritalStatus"}
                  title={"Marital Status"}
                  value={bioData ? bioData["maritalStatus"] : ""}
                  onChange={handleChange}
                  size={"midi"}
                  required={true}
                  disabled={disableEdit}
                />
              </div>
            </div>
            <div className="image_div">
              <div className="image_container">
                {profilePhoto && <img src={profilePhoto} alt={employeeName} />}
              </div>

              <div className="image_btn">
                <div style={{ display: "flex" }}>Attach File: Passport </div>
                <ImageUpload
                  title={<RiAttachment2 />}
                  onChange={photoHandler}
                  loading={upload}
                  value={""}
                  disabled={disableEdit}
                  accept={"image/png, image/jpeg"}
                />
              </div>
            </div>
          </div>
          <div className="formContainer">
            <div>
              <TextArea
                title={"Primary Address"}
                value={bioData ? bioData["primaryAddress"] : ""}
                onChange={handleChange}
                name={"primaryAddress"}
                required={true}
                disabled={disableEdit}
              />
              <TextArea
                title={"Supplementary Address "}
                value={bioData ? bioData["supplementaryAddress"] : ""}
                onChange={handleChange}
                name={"supplementaryAddress"}
                required={false}
                disabled={disableEdit}
              />
            </div>
            <div>
              <Input
                value={bioData ? bioData["zipcode"] : ""}
                onChange={handleChange}
                name={"zipcode"}
                type={"text"}
                title={"Zip Code"}
                size={"maxi"}
                disabled={disableEdit}
              />
              <Input
                value={bioData ? bioData["city"] : ""}
                onChange={handleChange}
                name={"city"}
                type={"text"}
                title={"City"}
                size={"maxi"}
                required={true}
                disabled={disableEdit}
              />
            </div>
            <div>
              <div className="divided">
                <Select
                  options={countries}
                  value={bioData ? bioData["country"] : ""}
                  onChange={handleChange}
                  name={"country"}
                  title={"Country"}
                  size={"midi"}
                  required={true}
                  disabled={disableEdit}
                />
                <Select
                  value={bioData ? bioData["state"] : ""}
                  onChange={handleChange}
                  name={"state"}
                  options={states}
                  title={"State"}
                  size={"midi"}
                  required={true}
                  disabled={disableEdit}
                />
              </div>
            </div>
          </div>
          <div className="btn_container">
            <div></div>
            <div>
              {" "}
              <button
                className="btns white"
                type="button"
                onClick={nextHandler}
              >
                Next
                <span
                  style={{
                    marginLeft: "20px",
                    display: "flex",
                    fontWeight: "600",
                  }}
                >
                  <AiOutlineArrowRight />
                </span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
