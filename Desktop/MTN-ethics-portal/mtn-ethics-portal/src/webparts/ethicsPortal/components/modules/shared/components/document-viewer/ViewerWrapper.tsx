import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import "./styles/styles.css";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaDownload,
} from "react-icons/fa";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  data: string;
};

export const ViewerWrapper: React.FC<Props> = ({ children, onClose, data }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <Box
      style={{
        display: "flex",
        width: "100%",
        backgroundColor: "#fff",
        justifyContent: "space-between",
        overflowX: "hidden",
        height: "100%",
        gap: 0.5,
      }}
    >
      <Box style={{ flex: 1 }}>{children}</Box>
    </Box>
  );
};

const DrawerContainer = styled.div<{ open: boolean }>((props) => ({
  display: "flex",
  backgroundColor: props.open ? "#003049" : "none",
  height: props?.open ? "100%" : "30px",
  transition: "width .3s ease-in-out",
  boxSizing: "border-box",
  padding: "1rem",
  flex: props?.open ? 0.5 : 0,
  color: props.open ? "#fff" : "#003049",
}));

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "none",
  outline: "1px solid #fff",
  border: "1px solid #fff",
}));
