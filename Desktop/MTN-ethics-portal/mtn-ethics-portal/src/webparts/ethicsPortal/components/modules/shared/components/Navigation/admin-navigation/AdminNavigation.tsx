import { Box } from "@material-ui/core";
import * as React from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { adminNavItems } from "./menu";
import "./styles.css";
import { useHistory, Link } from "react-router-dom";

type Props = {};

export const AdminNavigation = (props: Props) => {
  const [activeMainMenu, setActiveMainMenu] = React.useState(
    localStorage.getItem("navIndex")
      ? parseInt(localStorage.getItem("navIndex"))
      : 0
  );
  const [activeSubMenu, setActiveSubMenu] = React.useState(
    localStorage.getItem("subIndex")
      ? parseInt(localStorage.getItem("subIndex"))
      : 0
  );
  const [openMenu, setOpenMenu] = React.useState(
    localStorage.getItem("navMenu")
      ? JSON.parse(localStorage.getItem("navMenu"))
      : false
  );

  const history = useHistory();

  React.useEffect(() => {
    localStorage.setItem("navMenu", JSON.stringify(openMenu));
  }, [openMenu, activeSubMenu, activeMainMenu]);

  return (
    <ul
      style={{
        width: "250px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        gap: "1rem",
        backgroundColor: "#fff",
        boxShadow: "2px 2p 5px rgba(0, 0, 0, 0.5)",
        boxSizing: "border-box",
        padding: "1rem .5rem",
        position: "absolute",
        zIndex: 99,
        top: 0,
      }}
    >
      <Box>
        <Link to="/">
          <img
            src="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/logo.png"
            alt=""
            width="150px"
            height="50px"
            style={{
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
        </Link>
      </Box>
      {adminNavItems.map((mainMenu, index) => {
        return (
          <>
            <li
              style={{
                display: "flex",
                gap: ".5rem",
                width: "100%",
                alignItems: "center",
                cursor: "pointer",
                boxSizing: "border-box",
                minHeight: "40px",
                padding: "0 .5rem",
                userSelect: "none",
              }}
              onClick={() => {
                localStorage.setItem("navIndex", index.toString());
                localStorage.setItem("activeRoute", mainMenu?.link);
                setActiveMainMenu(index);
                setOpenMenu(!openMenu);
                history.push(mainMenu?.link);
              }}
              className={activeMainMenu === index && openMenu ? "active" : ""}
            >
              <Box>
                <mainMenu.icon />
              </Box>
              <Box>{mainMenu.title}</Box>
              <Box>
                {mainMenu?.subNav?.length > 0 &&
                openMenu &&
                activeMainMenu === index ? (
                  <FaChevronDown fontSize=".5rem" />
                ) : (
                  <FaChevronRight fontSize=".5rem" />
                )}
              </Box>
            </li>
            <Box display="flex" flexDirection="column">
              {activeMainMenu === index && openMenu && (
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginLeft: "1rem",
                  }}
                >
                  {adminNavItems[activeMainMenu]?.subNav?.map((sub, i) => {
                    return (
                      <li
                        onClick={() => {
                          localStorage.setItem("subIndex", i.toString());
                          localStorage.setItem("activeRoute", sub?.link);
                          setActiveSubMenu(i);
                          history.push(sub?.link);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: ".5rem",
                          cursor: "pointer",
                          userSelect: "none",
                        }}
                        className={activeSubMenu === i ? "sub__active" : ""}
                      >
                        <Box>{sub?.icon && <sub.icon />}</Box>
                        <Box>{sub.title}</Box>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Box>
          </>
        );
      })}
    </ul>
  );
};
