import * as React from "react";
import MaterialTable from "material-table";
import { Navigation, Spinner, TitleHeader } from "../../Containers";
import { useHistory } from "react-router-dom";
import "@pnp/graph/users";
import { sp } from "@pnp/sp";

const CompalianceStatus = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [divisionNo, setDivisionNo] = React.useState(0);

  const history = useHistory();

  // type IType =
  //   | "string"
  //   | "boolean"
  //   | "numeric"
  //   | "date"
  //   | "datetime"
  //   | "time"
  //   | "currency";
  // const string: IType = "string";

  const [columns, setColumns] = React.useState([
    { title: "S/N", field: "ID", type: "string" as const },
    { title: "Employee ID", field: "EmployeeID", type: "string" as const },
    { title: "Divisions", field: "Division", type: "string" as const },
    {
      title: "Status",
      field: "PledgeStatus",
      type: "string" as const,
    },
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

  // const viewHandler = (rowData) => {
  //   console.log(rowData);
  // };

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`PledgeRegistration`)
      .items.filter(`Division eq 'Sales and Distribution'`)
      .get()
      .then((res) => {
        setDivisionNo(res.length);
        console.log(res.length);
      });
  }, []);

  return (
    <div className="appContainer">
      <Navigation status={`active`} />
      <div className="contentsRight">
        <div className="contentPage">
          <div className="dashboard">
            <div className="header__title">
              <TitleHeader title="Division" />
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
                    // {
                    //   icon: "visibility",
                    //   iconProps: { style: { fontSize: "11px", color: "gold" } },
                    //   tooltip: "Edit",

                    //   onClick: (event, rowData) => {},
                    // },
                    {
                      icon: "visibility",
                      iconProps: { style: { fontSize: "11px", color: "gold" } },
                      tooltip: "View",

                      onClick: (event, rowData) => {
                        history.push(
                          `/admin/viewdivisions/${rowData.Division}`
                        );
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

export default CompalianceStatus;
