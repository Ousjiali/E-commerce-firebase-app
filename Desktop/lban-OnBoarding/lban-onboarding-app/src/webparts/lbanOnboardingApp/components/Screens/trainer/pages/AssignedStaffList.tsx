import * as React from "react";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { AppWrapper } from "../../../Container/AppWrapper";
import { Menu } from "../../../Container/AppNavigation";
import { StaffProfileResponse } from "../../headOfDepartment/modals/AssignTrainerModal";
import { sp } from "@pnp/sp";
import { TableIcons, TableStyles } from "../styles/styles";

export const AssignedStaffList = () => {
  const history = useHistory();
  type IType =
    | "string"
    | "boolean"
    | "numeric"
    | "date"
    | "datetime"
    | "time"
    | "currency";
  const string: IType = "string";

  const [columns, setColumns] = React.useState([
    {
      title: "SN",
      field: "tableData[id]",
      render: (data) => <>{data.tableData["id"] + 1}</>,
    },
    { title: "Name", field: "StaffName", type: "string" as const },
    { title: "Email", field: "StaffEmail", type: "string" as const },
    {
      title: "Profile Status",
      field: "ProfileStatus",
      type: "string" as const,
    },
  ]);

  const [data, setData] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    sp.utility.getCurrentUserEmailAddresses().then((email) => {
      setEmail(email);
    });
  }, []);

  React.useEffect(() => {
    if (!email) return;
    setLoading(true);
    sp.web.lists
      .getByTitle(`StaffProfile`)
      .items.filter(
        `ProfileStatus eq 'Approved' and IsAssignedTrainer eq '${1}' and AssignedTrainer eq '${email}'`
      )
      .get()
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [email]);

  return (
    <AppWrapper menu={menu} showBackButton={true}>
      <div>
        <MaterialTable
          title="Assigned Staff To Train List"
          icons={TableIcons}
          columns={columns}
          data={data}
          isLoading={loading}
          options={{
            exportButton: true,
            actionsCellStyle: {
              backgroundColor: "none",
              color: "#FF00dd",
            },
            actionsColumnIndex: -1,

            headerStyle: {
              backgroundColor: "#9B1C8D",
              color: "white",
            },
            rowStyle: {
              fontSize: 13,
            },
          }}
          style={{ ...TableStyles }}
          actions={[
            {
              icon: "visibility",
              iconProps: { style: { fontSize: "11px", color: "gold" } },
              tooltip: "assign",

              onClick: (event, rowData: StaffProfileResponse) => {
                history.push(`/trainer?StaffEmail=${rowData.StaffEmail}`);
              },
            },
            {
              icon: "visibility",
              iconProps: { style: { fontSize: "11px", color: "gold" } },
              tooltip: "view-trainings",

              onClick: (event, rowData: StaffProfileResponse) => {
                history.push(
                  `/trainings?StaffEmail=${rowData.StaffEmail}&Trainer=${rowData.AssignedTrainer}`
                );
              },
            },
          ]}
          components={{
            Action: (props) => (
              <Box style={{ display: "flex", gap: ".5rem", width: "100%" }}>
                {(() => {
                  if (props.action.tooltip === "assign") {
                    return (
                      <Button
                        onClick={(event) =>
                          props.action.onClick(event, props.data)
                        }
                        style={{
                          textTransform: "none",
                          width: "200px",
                          margin: "0 20px",
                        }}
                        size="medium"
                        variant="contained"
                        color="primary"
                      >
                        Assign Training
                      </Button>
                    );
                  } else {
                    return (
                      <Button
                        onClick={(event) =>
                          props.action.onClick(event, props.data)
                        }
                        style={{
                          textTransform: "none",
                        }}
                        size="medium"
                        variant="contained"
                        color="primary"
                      >
                        View
                      </Button>
                    );
                  }
                })()}
              </Box>
            ),
          }}
        />
      </div>
    </AppWrapper>
  );
};

const menu: Menu[] = [
  {
    link: "/trainer-list",
    title: "My List",
  },
];
