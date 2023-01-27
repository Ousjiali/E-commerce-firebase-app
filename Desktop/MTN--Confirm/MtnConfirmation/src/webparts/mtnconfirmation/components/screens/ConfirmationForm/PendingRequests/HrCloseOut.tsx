import * as React from "react";
import styles from "./pendingRequests.module.scss";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { Header, Spinner } from "../../../Containers";
import { sp } from "@pnp/sp";
import "@pnp/graph/users";
import swal from "sweetalert";

const HrAdminstrationPendingPage = () => {
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
            swal(
              "Warning!",
              "You are not HR HCM Administrator,You are not authorize to access this page",
              "error"
            );
            history.push("/");
          }
        });
    });
  }, []);
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
    { title: "ID", field: "ID", type: "string" as const },
    { title: "Employee Name", field: "EmployeeName", type: "string" as const },
    { title: "Employee ID", field: "EmployeeID", type: "string" as const },
    { title: "Form No", field: "FormNo", type: "string" as const },
    { title: "Job Title", field: "JobTitle", type: "string" as const },
    { title: "Staff Level", field: "Level", type: "string" as const },
  ]);

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle(`Confirmation`)
      .items.filter(
        `ConfirmationStatus eq 'Pending' and Approvals eq 'HR Close Out Request'`
      )
      .get()
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div>
        <Header title="Pending Request" />
      </div>

      <div className={styles.view__Container}>
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
                color: "#FF20ff",
              },
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: "whitesmoke",
                color: "black",
                borderRadius: 5,
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
            actions={[
              {
                icon: "visibility",
                iconProps: { style: { fontSize: "11px" } },
                tooltip: "View",

                onClick: (event, rowData) => {
                  history.push(`/viewrequest/details/${rowData.ID}`);
                },
              },
            ]}
            components={{
              Action: (props) => (
                <button
                  onClick={(event) => props.action.onClick(event, props.data)}
                  className={styles.mtn__blackBtn}
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

export default HrAdminstrationPendingPage;
