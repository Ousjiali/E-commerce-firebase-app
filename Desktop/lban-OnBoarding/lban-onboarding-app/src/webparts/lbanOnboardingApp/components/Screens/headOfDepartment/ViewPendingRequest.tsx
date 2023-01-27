import { sp } from "@pnp/sp";

import * as React from "react";
import { Menu } from "../../Container/AppNavigation";
import { AppWrapper } from "../../Container/AppWrapper";
import { useHistory } from "react-router-dom";
import {
  AssignTrainerModal,
  StaffProfileResponse,
} from "./modals/AssignTrainerModal";
import { Button } from "@material-ui/core";

export const ViewPendingRequest = ({ match }) => {
  let itemsID = match.params.id;

  const history = useHistory();

  const [assignTrainer, setAssignTrainer] = React.useState(false);
  const [staff, setStaff] = React.useState<StaffProfileResponse>();
  const [isAssignedTrainer, setIsAssignTrainer] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`StaffProfile`)
      .items.getById(itemsID)
      .get()
      .then((res) => {
        setStaff(res);
      });
  }, [isSuccess]);

  return (
    <div>
      <AppWrapper menu={menu} showBackButton={true}>
        <div>
          <div className="gridbox__allContent">
            <div className="eachGridbox__allContent">
              <header>Employee Name</header>
              <h5 className="grid__titleContent">
                <p className="styles.grid__titleName">{staff?.StaffName}</p>
              </h5>
            </div>
            <div className="eachGridbox__allContent">
              <header>Head Of Department</header>
              <h5 className="grid__titleContent">
                <p className="styles.grid__titleName">{staff?.HOD}</p>
              </h5>
            </div>
            <div className="eachGridbox__allContent">
              <header>Profile Status</header>
              <h5 className="grid__titleContent">
                <p className="styles.grid__titleName">{staff?.ProfileStatus}</p>
              </h5>
            </div>
            {staff?.IsAssignedTrainer && (
              <div className="eachGridbox__allContent">
                <header>Assigned Trainer</header>
                <h5 className="grid__titleContent">
                  <p className="styles.grid__titleName">
                    {staff?.AssignedTrainer}
                  </p>
                </h5>
              </div>
            )}
          </div>
          <div className="assign__btn">
            <Button
              className="assign__btn2"
              onClick={() => setAssignTrainer(true)}
              variant="contained"
              color="primary"
              style={{ textTransform: "none" }}
              disabled={isAssignedTrainer || staff?.IsAssignedTrainer}
            >
              Assign Trainer
            </Button>
          </div>
        </div>
        {assignTrainer && (
          <AssignTrainerModal
            open={true}
            onClose={(status) => {
              setAssignTrainer(false);
              if (status) {
                setIsAssignTrainer(true);
                setIsSuccess((prev) => !prev);
              }
            }}
            staff={staff}
          />
        )}
      </AppWrapper>
    </div>
  );
};

const menu: Menu[] = [
  {
    link: "/assign/trainer/hod",
    title: "My List",
  },
];
