import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { AdminHeader, Navigation, Spinner } from "../../../Containers";
import MaterialTable from "material-table";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import "@pnp/graph/users";

const AdminPending = () => {
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
    {
      title: "Status",
      field: "ConfirmationStatusByScore",
      type: "string" as const,
    },
    {
      title: "Approvals",
      field: "Approvals",
      type: "string" as const,
    },
    {
      title: "Employee Name",
      field: "EmployeeName",
      type: "string" as const,
    },
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
  ]);

  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [id, setID] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle(`Confirmation`)
      .items.filter(`ConfirmationStatus eq 'Pending'`)
      .get()
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      console.log("response:", response);
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

  const editHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("Confirmation")
      .items.getById(id)
      .update({
        Title: name,
        Email: email,
        Role: role,
      })
      .then((res) => {
        swal("Success", "Confirmation Edited Successfully", "success");
        sp.web.lists
          .getByTitle(`Confirmation`)
          .items.get()
          .then((res) => {
            setData(res);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };

  //   if (window.confirm("Are you sure you want to delete")) {
  //     sp.web.lists
  //       .getByTitle("Confirmation")
  //       .items.getById(id)
  //       .delete()
  //       .then((res) => {
  //         swal("Success", "Confirmation has been deleted", "success");
  //         sp.web.lists
  //           .getByTitle(`Confirmation`)
  //           .items.get()
  //           .then((res) => {
  //             setData(res);
  //           });
  //       });
  //   }
  // };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      setLoading(true);
      sp.web.lists
        .getByTitle("Confirmation")
        .items.getById(id)
        .get()
        .then((res) => {
          let employeeID = res.EmployeeID;
          console.log("employee Id has been set");
          sp.web.lists
            .getByTitle(`PerformanceFactorEvaluation`)
            .items.filter(`EmployeeID eq '${employeeID}'`)
            .get()
            .then((resp) => {
              if (resp.length > 0) {
                const performanceID = resp[0].ID;
                console.log("performance id set");
                sp.web.lists
                  .getByTitle("PerformanceFactorEvaluation")
                  .items.getById(Number(performanceID))
                  .delete()
                  .then((deletedPerformance) => {
                    console.log("performance deleted");
                    sp.web.lists
                      .getByTitle("SupervisoryEvaluation")
                      .items.filter(`EmployeeID eq '${employeeID}'`)
                      .get()
                      .then((item) => {
                        if (item.length > 0) {
                          const supervisoryID = item[0].ID;

                          sp.web.lists
                            .getByTitle("SupervisoryEvaluation")
                            .items.getById(Number(supervisoryID))
                            .delete()
                            .then((deletedSupervisory) => {});
                          console.log("deleted supervisory");
                        }
                      });
                  });
              }
              sp.web.lists
                .getByTitle("BehavioralTraitsEvaluation")
                .items.filter(`EmployeeID eq '${employeeID}'`)
                .get()
                .then((response) => {
                  if (response.length > 0) {
                    const behaviouralID = response[0].ID;
                    console.log("behavioral Id has been set");
                    sp.web.lists
                      .getByTitle("BehavioralTraitsEvaluation")
                      .items.getById(Number(behaviouralID))
                      .delete()
                      .then((deletedBehavioural) => {
                        console.log("behavioral deleted");
                        sp.web.lists
                          .getByTitle("EvaluationComments")
                          .items.filter(`EmployeeID eq '${employeeID}'`)
                          .get()
                          .then((item) => {
                            if (item.length > 0) {
                              const evaluationID = item[0].ID;
                              sp.web.lists
                                .getByTitle("EvaluationComments")
                                .items.getById(Number(evaluationID))
                                .delete()
                                .then((deletedEvaluation) => {});
                            }
                          });
                      });
                  }
                  sp.web.lists
                    .getByTitle("Confirmation")
                    .items.getById(id)
                    .delete()
                    .then((res) => {
                      swal("successful", {
                        buttons: { cancel: false, confirm: false },
                        timer: 2000,
                      });
                      console.log("confirmation deleted");
                      sp.web.lists
                        .getByTitle(`Confirmation`)
                        .items.filter(`ConfirmationStatus eq 'Pending'`)
                        .get()
                        .then((res) => {
                          setData(res);
                          setLoading(false);
                        });
                    });
                });
            });
        });
    }
  };

  return (
    <div className="appContainer">
      <Navigation pending={`active`} />
      <div className="contentsRight">
        <AdminHeader title="Pending Requests" />
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
                  history.push(`/admin/pending/${rowData.ID}`);
                },
              },
              {
                icon: "visibility",
                iconProps: { style: { fontSize: "11px", color: "gold" } },
                tooltip: "Edit",

                onClick: (event, rowData) => {
                  history.push(`/admin/confirmation/edit/${rowData.ID}`);
                },
              },
              {
                icon: "visibility",
                iconProps: { style: { fontSize: "11px", color: "gold" } },
                tooltip: "Delete",

                onClick: (event, rowData) => {
                  deleteHandler(rowData.ID);
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

export default AdminPending;
