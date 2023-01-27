import { Button } from "@material-ui/core";
import * as React from "react";

type Props = {
  onClick: (e?: any | unknown) => void;
  danger?: boolean;
  title: string;
  loading?: boolean;
  startIcon?: React.ReactElement;
};
export const ContextMenuButton: React.FC<Props> = ({
  danger,
  onClick,
  title,
  loading,
  startIcon,
}) => {
  return (
    <Button onClick={onClick} startIcon={startIcon}>
      {title}
    </Button>
  );
};
