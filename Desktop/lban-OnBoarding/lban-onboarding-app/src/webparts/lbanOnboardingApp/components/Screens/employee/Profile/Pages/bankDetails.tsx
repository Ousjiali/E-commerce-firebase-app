import * as React from "react";
import { Menu } from "../../../../Container/AppNavigation";
import Input from "../../../../Container/Form";
import TextArea from "../../../../Container/Form/TextArea";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import "../profile.css";
import { getUserProfileData } from "../../../../hooks/useUserProfileData";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import { CircularProgress } from "@material-ui/core";
import { useFormContextData } from "../../../../Context";

type Props = {};

export const BankDetails = (props: Props) => {
  const [disableEdit, setDisableEdit] = React.useState(false);

  const { bankData, setBankData, nextPage, prevPage } = useFormContextData();

  console.log(bankData);

  React.useEffect(() => {
    setLoading(true);
    sp.profiles.myProperties.get().then((res) => {
      sp.web.lists
        .getByTitle("StaffProfile")
        .items.filter(`StaffEmail eq '${res?.Email}'`)
        .get()
        .then((response) => {
          if (response.length) {
            const profileStatus = response[0].ProfileStatus;
            if (profileStatus === "Approved") {
              setDisableEdit(true);
            }
            setID(response[0].ID);
            const staffData = JSON.parse(response[0].Bank);
            setBankData(staffData);
          }

          setLoading(false);
        });
    });
  }, []);

  const [ID, setID] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankData({ ...bankData, [name]: value });
  };

  return (
    <div className="Displayflex">
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
          <div className="formContainer" style={{ marginTop: "5%" }}>
            <div>
              <Input
                name={"bankName"}
                value={bankData ? bankData["bankName"] : ""}
                onChange={handleChange}
                type={"text"}
                title={"Bank Name"}
                size={"maxi"}
                required={true}
                disabled={disableEdit}
              />
              <Input
                name={"BVN"}
                value={bankData ? bankData["BVN"] : ""}
                onChange={handleChange}
                type={"number"}
                title={"BVN"}
                size={"maxi"}
                required={true}
                disabled={disableEdit}
              />
            </div>
            <div>
              <Input
                name={"accountName"}
                value={bankData ? bankData["accountName"] : ""}
                onChange={handleChange}
                type={"text"}
                title={"Account Name"}
                size={"maxi"}
                required={true}
                disabled={disableEdit}
              />

              <Input
                name={"accountNumber"}
                value={bankData ? bankData["accountNumber"] : ""}
                onChange={handleChange}
                type={"number"}
                title={"Account Number"}
                size={"maxi"}
                required={true}
                disabled={disableEdit}
              />
            </div>
            <div>
              <TextArea
                name={"bankPrimaryAddress"}
                value={bankData ? bankData["bankPrimaryAddress"] : ""}
                onChange={handleChange}
                title={" Bank Primary Address"}
                disabled={disableEdit}
              />
              <Input
                name={"accountType"}
                value={bankData ? bankData["accountType"] : ""}
                onChange={handleChange}
                type={"text"}
                title={"Account Type"}
                size={"maxi"}
                required={true}
                disabled={disableEdit}
              />
            </div>
          </div>
          <div className="btn_container ">
            <button
              className="btns white"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                prevPage();
              }}
            >
              <span
                style={{
                  marginRight: "20px",
                  display: "flex",
                  fontWeight: "600",
                }}
              >
                <AiOutlineArrowLeft />
              </span>
              Back
            </button>

            <button
              className="btns white"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                nextPage();
              }}
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
        </form>
      )}
    </div>
  );
};

const menu: Menu[] = [
  { title: "Profile Update", link: "/employee/profile-update" },
  { title: "Training", link: "/employee/training" },
];
