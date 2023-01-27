import { Box, BoxProps, colors, styled, Typography } from "@material-ui/core";
import * as React from "react";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { useHistory } from "react-router-dom";
import { adminNavItems } from "../../../shared/components/Navigation/admin-navigation/menu";

export const AdminDashboard = () => {
  const history = useHistory();
  return (
    <AdminWrapper>
      <Box minHeight="100vh">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            width: "100%",
          }}
          style={{ gap: "2rem" }}
        >
          {adminNavItems
            .filter((it, i) => it.title !== "Dashboard" && i !== 0)
            .map((item, index) => {
              return (
                <DashboardCard
                  onClick={() => {
                    localStorage.setItem("navIndex", (index + 1).toString());
                    localStorage.setItem("activeRoute", item?.link);
                    history.push(`${item?.link}`);
                  }}
                >
                  <item.icon
                    style={{
                      fontSize: "1.5rem",
                    }}
                  />
                  <Typography variant="body1">{item?.title}</Typography>
                </DashboardCard>
              );
            })}
        </Box>
      </Box>
    </AdminWrapper>
  );
};

const DashboardCard = styled(Box)<BoxProps>({
  width: "auto",
  gap: 1.5,
  height: "120px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#fff",
  boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    background: colors.yellow[600],
    fontWeight: "bold",
  },
});
