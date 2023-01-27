import Box from "@material-ui/core/Box";
import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { makeStyles } from "@material-ui/core";
import { theme } from "../../../../../themes/themes";
import { createStyles, Theme } from "@material-ui/core/styles";
import { MLink, PageNavigationContainer } from "../../../../../styles/styles";

type Props = {
  nav: PageNav[];
};

export type PageNav = {
  id: string | number;
  text: string;
  link: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    active: {
      background: theme.palette.common.white,
      borderRadius: "10px",
    },
    itemLink: {
      "&:hover": {
        background: theme.palette.common.white,
      },
      color: "#000",
      height: "40px",
      minWidth: "100%",
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
      borderRadius: "10px",
      paddingLeft: "10px",
      paddingRight: "10px",
    },
  })
);

export const PageNavigation: React.FC<Props> = ({ nav }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);

  return (
    <Box position="relative">
      <PageNavigationContainer open={open}>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? (
            <FaAngleDoubleRight
              color={theme.palette.common.black}
              style={{ fontSize: "1rem" }}
            />
          ) : (
            <FaAngleDoubleLeft
              color={theme.palette.common.black}
              style={{ fontSize: "1rem" }}
            />
          )}
        </IconButton>
        <Box
          style={{
            display: open ? "flex" : "none",
            maxWidth: "90%",
            minHeight: "200px",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {nav.length &&
            nav.map((item, index) => {
              return (
                <Box
                  className={`${active === index && classes.active} ${
                    classes.itemLink
                  }`}
                  onClick={() => setActive(index)}
                  fontSize=".7rem"
                >
                  <MLink to={`${item.link}`}>{item?.text}</MLink>
                </Box>
              );
            })}
        </Box>
      </PageNavigationContainer>
    </Box>
  );
};
