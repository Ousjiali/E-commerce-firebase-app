import MaterialTable from "material-table";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { Navigation, Spinner, TitleHeader } from "../../Containers";
import "@pnp/graph/users";
import { sp } from "@pnp/sp";
import swal from "sweetalert";

const ReportLog = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([
    { title: "S/N", field: "ID", type: "string" as const },
    { title: "Employee ID", field: "EmployeeID", type: "string" as const },
    {
      title: "Employee Full Name",
      field: "EmployeeName",
      type: "string" as const,
    },
    {
      title: "Employee HCMs ID",
      field: "HCMIDs",
      type: "string" as const,
    },
    { title: "Department", field: "Department", type: "string" as const },
    { title: "Date of Pledge Submitted", field: "PledgeDate" },
    { title: "Time of Pledge Submitted", field: "PledgeTimes" },
  ]);

  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle(`PledgeRegistration`)
      .items.get()
      .then((res) => {
        console.log(res);
        setData(res);
        setLoading(false);
      });
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      sp.web.lists
        .getByTitle("PledgeRegistration")
        .items.getById(id)
        .delete()
        .then((res) => {
          swal("Success", "Admin has been deleted", "success");
          sp.web.lists
            .getByTitle(`PledgeRegistration`)
            .items.get()
            .then((res) => {
              setData(res);
            });
        });
    }
  };

  return (
    <div className="appContainer">
      <Navigation report={`active`} />
      <div className="contentsRight">
        <div className="contentPage">
          <div className="dashboard">
            <div className="header__title">
              <TitleHeader title="Report Log" />
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <div>
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
                    actionsColumnIndex: -1,

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
                        history.push(`/viewpledge/details/${rowData.ID}`);
                        // deleteHandler(rowData.ID);
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
                        onClick={(event) =>
                          props.action.onClick(event, props.data)
                        }
                        className="mtn__btn_table mtn__black"
                      >
                        {props.action.tooltip}
                      </button>
                    ),
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportLog;
