import { Avatar, Box, Typography } from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";

import * as React from "react";
import { useHistory } from "react-router-dom";
import { WebContext } from "../LbanOnboardingApp";
import "./styles.css";

interface User {
  name: string;
  photoUrl: string;
}

export interface Menu {
  title: string;
  link: string;
}

type Props = {
  menu: Menu[];
};

export const AppNavigation: React.FC<Props> = ({ menu }) => {
  const { role } = React.useContext(WebContext);
  const { data } = useQuery<User>(["userProfile"], async () => {
    try {
      const res = await sp.profiles.myProperties.get();
      return {
        name: res?.DisplayName,
        photoUrl: res?.PictureUrl,
      };
    } catch (e) {
      // errorAlert(toast);
    }
  });
  const history = useHistory();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [userRole, setRole] = React.useState("");
  React.useEffect(() => {
    switch (role) {
      case "isHr":
        setRole("Human Resource Manager");
        return;
      case "isTrainer":
        setRole("Trainer");
        return;
      case "isHod":
        setRole("Department Manager");
        return;
      default:
        setRole("");
        return;
    }
  }, [role]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        minWidth: "100%",
        height: "100px",
      }}
    >
      <Box
        flex={1}
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        style={{ gap: ".5rem" }}
      >
        <img
          src="https://lotusbetaanalytics.sharepoint.com/sites/lban-Onboarding-Portal/assets/Onboarding-image.png"
          alt=""
          width="150"
          height="100"
          style={{ objectFit: "contain", cursor: "pointer" }}
          onClick={() => history.push("/")}
        />
      </Box>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
          justifyContent: "flex-end",
          flex: "2",
        }}
      >
        {menu.map((item, index) => {
          return (
            <div
              onClick={() => {
                setActiveIndex(index);
                history.push(item.link);
              }}
              className={
                activeIndex === index ? "active menu__item" : "menu__item"
              }
            >
              <Typography variant="body1">{item.title}</Typography>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flex: 1,
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <Avatar src={data?.photoUrl} />
        <Box>
          <Typography variant="body1" style={{}}>
            {data?.name}
          </Typography>
          <Typography variant="caption" style={{}}>
            {userRole}
          </Typography>
        </Box>
      </div>
    </div>
  );
};
