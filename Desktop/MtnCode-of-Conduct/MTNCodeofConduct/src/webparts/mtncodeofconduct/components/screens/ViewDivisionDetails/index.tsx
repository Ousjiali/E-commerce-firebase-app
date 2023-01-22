import MaterialTable from "material-table";
import * as React from "react";
import { Navigation, Spinner, TitleHeader } from "../../Containers";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";

const ViewDivisionDetails = ({ match }) => {
  let itemID = match.params.id;
  console.log(itemID);

  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  const [columns, setColumns] = React.useState([
    {
      title: "Employee Full Name",
      field: "EmployeeName",
      type: "string" as const,
    },
    { title: "Employee HCM ID", field: "HCMIDs", type: "string" as const },
    { title: "Division Name", field: "Division", type: "string" as const },
  ]);

  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle(`PledgeRegistration`)
      .items.filter(`Division eq '${itemID}'`)
      .get()
      .then((res) => {
        console.log(res);
        setData(res);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="appContainer">
        <Navigation status={`active`} />
        <div className="contentsRight">
          <div className="contentPage">
            <div className="dashboard">
              <div className="header__title">
                <TitleHeader title="View Division List" />
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
                        iconProps: {
                          style: { fontSize: "11px", color: "gold" },
                        },
                        tooltip: "View",

                        onClick: (event, rowData) => {
                          history.push(
                            `/admin/viewdivisions/list/${rowData.ID}`
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
    </div>
  );
};

export default ViewDivisionDetails;
