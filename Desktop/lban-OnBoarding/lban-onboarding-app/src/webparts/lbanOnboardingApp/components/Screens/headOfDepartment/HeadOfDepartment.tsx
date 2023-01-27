import * as React from "react";
import { Menu } from "../../Container/AppNavigation";
import { AppWrapper } from "../../Container/AppWrapper";
import MaterialTable, { MTableToolbar } from "material-table";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { TableIcons, TableStyles } from "../trainer/styles/styles";
import { sp } from "@pnp/sp";

export const HeadOfDepartment = () => {
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
  const [status, setStatus] = React.useState("Approved");
  const [isAssignedTrainer, setIsAssignedTrainer] = React.useState(0);

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
        `ProfileStatus eq '${status}' and HOD eq '${email}' and IsAssignedTrainer eq '${isAssignedTrainer}' `
      )
      .get()
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [email, status, isAssignedTrainer]);

  return (
    <AppWrapper menu={menu} showBackButton={true}>
      <div>
        <MaterialTable
          title="New Onboarded Staff Member List"
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
          style={TableStyles}
          actions={[
            {
              icon: "visibility",
              iconProps: { style: { fontSize: "11px", color: "gold" } },
              tooltip: "Assign Trainer",

              onClick: (event, rowData) => {
                history.push(`/employee/HOD/viewpendingrequest/${rowData.ID}`);
              },
            },
          ]}
          components={{
            Action: (props) => (
              <Button
                onClick={(event) => props.action.onClick(event, props.data)}
                style={{
                  textTransform: "none",
                  width: "200px",
                }}
                size="large"
                variant="contained"
                color="primary"
              >
                {props.action.tooltip}
              </Button>
            ),
            Toolbar: (props) => {
              return (
                <Box>
                  <MTableToolbar {...props} />
                  <Box
                    width="100%"
                    height="50px"
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    style={{ gap: "1rem" }}
                    my={2.5}
                  >
                    <FormControl>
                      <InputLabel>Approval Status</InputLabel>
                      <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as string)}
                        label="Approval Status"
                        variant="outlined"
                        fullWidth
                      >
                        <MenuItem value="Approved">Approved List</MenuItem>
                        <MenuItem value="Pending">Pending List</MenuItem>
                        <MenuItem value="Rejected">Rejected List</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel>Assigned Trainer?</InputLabel>
                      <Select
                        value={isAssignedTrainer}
                        onChange={(e) =>
                          setIsAssignedTrainer(e.target.value as number)
                        }
                        label="Assigned Trainer?"
                        variant="outlined"
                        fullWidth
                        style={{
                          minWidth: "150px",
                        }}
                      >
                        <MenuItem value={1}>Yes</MenuItem>
                        <MenuItem value={0}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              );
            },
          }}
        />
      </div>
    </AppWrapper>
  );
};

const menu: Menu[] = [];
