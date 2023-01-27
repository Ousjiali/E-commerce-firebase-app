import { Button, Typography } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";
import { theme } from "../themes/themes";

type ContextMenuLinkType = {
  to: string;
  danger?: boolean;
  title?: string;
  icon?: any;
  isActive?: boolean;
};
export const ContextMenuLink: React.FC<ContextMenuLinkType> = ({
  to,
  danger,
  title,
  icon,
  isActive,
}) => {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: danger ? "red" : theme.palette.common.black,
        margin: 0,
        width: "inherit",
        height: "inherit",
        borderRadius: "10px",
      }}
    >
      <Typography
        style={{
          padding: theme.spacing(2),
          textAlign: "center",
        }}
        variant="body2"
      >
        {title} {isActive}
      </Typography>
    </Link>
  );
};
