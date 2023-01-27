import { Box, Button } from "@material-ui/core";
import * as React from "react";
import { theme } from "../../../../themes/themes";

type Props = {
  data: any[];
  children: React.ReactNode;
  onUpdate: React.Dispatch<any[]>;
  pageSize: number;
  rowsPerPage: number;
};

export const PaginationContainer: React.FC<Props> = ({
  children,
  data,
  onUpdate,
  pageSize,
  rowsPerPage,
}) => {
  const [page, setPage] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const [paginateArr, setPaginateArr] = React.useState([]);
  const handleChangePage = (page: number) => {
    setPage(page);
  };

  React.useEffect(() => {
    for (let i = 0; i < pageSize; i++) {
      setPaginateArr((prev) => [...prev, i]);
    }
  }, [pageSize]);
  React.useEffect(() => {
    const splice = data?.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    onUpdate(splice);
  }, [page, data]);

  return (
    <>
      {children}

      <Box
        style={{
          minWidth: "100%",
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        my={2}
      >
        {paginateArr.length > 1 &&
          paginateArr.map((item, index) => (
            <Box
              style={{
                width: "100px",
                borderRadius: "26px",
                cursor: "pointer",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                handleChangePage(index);
                setActive(index);
              }}
              color={
                active === index
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main
              }
              bgcolor={
                active === index
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main
              }
            >
              {item + 1}
            </Box>
          ))}
      </Box>
    </>
  );
};
