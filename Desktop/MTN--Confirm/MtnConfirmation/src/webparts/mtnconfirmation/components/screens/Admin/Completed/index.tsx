import * as React from "react";
import { useHistory } from "react-router-dom";
import { AdminHeader, Navigation, Spinner } from "../../../Containers";
import MaterialTable from "material-table";
import { sp } from "@pnp/sp";
import "@pnp/graph/users";

const AdminCompleted = () => {
  // Helpers
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
    { title: "Employee Name", field: "EmployeeName", type: "string" as const },
    { title: "Employee ID", field: "EmployeeID", type: "string" as const },
    { title: "Form No", field: "FormNo", type: "string" as const },
    { title: "Job Title", field: "JobTitle", type: "string" as const },
    { title: "Staff Level", field: "Level", type: "string" as const },
    { title: "Location", field: "Location", type: "string" as const },
    { title: "Division", field: "Division", type: "string" as const },
    { title: "Department", field: "Department", type: "string" as const },
    { title: "Phone Number", field: "Phone", type: "string" as const },
    { title: "Rater", field: "Rater", type: "string" as const },
    {
      title: "Employment Date",
      field: "EmploymentDate",
      type: "string" as const,
    },
    {
      title: "Confirmation Date",
      field: "ConfirmationDate",
      type: "string" as const,
    },
    { title: "Start Date", field: "StartDate", type: "string" as const },
    { title: "End Date", field: "EndDate", type: "string" as const },
    {
      title: "Status",
      field: "ConfirmationStatusByScore",
      type: "string" as const,
    },
    {
      title: "Approvals",
      field: "ConfirmationStatus",
      type: "string" as const,
    },
  ]);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      sp.web.lists
        .getByTitle(`Admin`)
        .items.filter(
          `Title eq '${response.DisplayName}' and Role eq 'HR HCM Administrator'`
        )
        .get()
        .then((res) => {
          if (res.length === 0) {
            history.push("/");
          }
        });
    });
  }, []);

  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle(`Confirmation`)
      .items.filter(`ConfirmationStatus eq 'Completed'`)
      .get()
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  return (
    <div className="appContainer">
      <Navigation complete={`active`} />
      <div className="contentsRight">
        <AdminHeader title="Completed Requests" />
        <br />
        {loading ? (
          <Spinner />
        ) : (
          <MaterialTable
            title=""
            columns={columns}
            data={data}
            options={{
              exportButton: true,
              actionsCellStyle: {
                backgroundColor: "none",
                color: "#FF00dd",
              },
              actionsColumnIndex: 0,

              headerStyle: {
                backgroundColor: "#FFCC00",
                color: "black",
              },
              rowStyle: {
                fontSize: 13,
              },
            }}
            style={{
              boxShadow: "none",
              width: "100%",
              background: "none",
              fontSize: "13px",
            }}
            // icons={{Add: () => 'Add Row'}}
            actions={[
              {
                icon: "visibility",
                iconProps: { style: { fontSize: "11px", color: "gold" } },
                tooltip: "View",

                onClick: (event, rowData) => {
                  history.push(`/admin/completed/view/${rowData.ID}`);
                },
              },

              {
                icon: "visibility",
                iconProps: { style: { fontSize: "11px", color: "gold" } },
                tooltip: "Report",

                onClick: (event, rowData) => {
                  history.push(`/admin/completed/report/${rowData.EmployeeID}`);
                },
              },
            ]}
            components={{
              Action: (props) => (
                <button
                  onClick={(event) => props.action.onClick(event, props.data)}
                  className="mtn__btn_table mtn__black"
                >
                  {props.action.tooltip}
                </button>
              ),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminCompleted;
