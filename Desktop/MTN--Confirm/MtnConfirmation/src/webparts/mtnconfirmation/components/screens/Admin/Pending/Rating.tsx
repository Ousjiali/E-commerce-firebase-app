import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Select,
  AdminHeader,
  Input,
  Navigation,
  Helpers,
  MenuBar,
  Spinner,
  Text,
} from "../../../Containers";
import MaterialTable from "material-table";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import { graph } from "@pnp/graph";
import "@pnp/graph/users";

const AdminViewRating = ({ match }) => {
  // Helpers
  const history = useHistory();
  const itemID = match.params.id;

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`PerformanceFactorEvaluation`)
      .items.filter(`EmployeeID eq '${itemID}'`)
      .get()
      .then((res) => {
        setData(res);
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
  const [columns, setColumns] = React.useState([
    {
      title: "Rater",
      field: "RaterName",
      type: "string" as const,
    },
    { title: "Rating Date", field: "RatingDate", type: "string" as const },
    {
      title: "Knowlegde Rating",
      field: "KnowlegdeRating",
      type: "string" as const,
    },
    {
      title: "Work Quality Rating",
      field: "WorkQualityRating",
      type: "string" as const,
    },
    {
      title: "Work Quality Comment",
      field: "WorkQualityComment",
      type: "string" as const,
      cellStyle: {
        width: "160px",
      },
      headerStyle: {
        width: "160px",
      },
    },
    {
      title: "Work Quantity Rating",
      field: "WorkQuantityRating",
      type: "string" as const,
    },
    {
      title: "Work Quantity Comment",
      field: "WorkQuantityComment",
      type: "string" as const,
    },
    {
      title: "Work Habit Rating",
      field: "WorkHabitRating",
      type: "string" as const,
    },
    {
      title: "Work Habit Comment ",
      field: "WorkHabitComment",
      type: "string" as const,
    },
    {
      title: "Communicaton Rating",
      field: "CommunicatonRating",
      type: "string" as const,
    },
    {
      title: "Communication Comment",
      field: "CommunicationComment",
      type: "string" as const,
    },
    {
      title: "Total Score",
      field: "TotalScore",
      type: "string" as const,
    },
  ]);

  return (
    <div className="appContainer">
      <Navigation pending={`active`} />
      <div className="contentsRight">
        <AdminHeader title="Ratings" />
        {loading ? (
          <Spinner />
        ) : (
          <div className="textContainer">
            <MaterialTable
              title="Perfrance factor"
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
                  textAlign: "justify",
                  paddingRight: "12px",
                  verticalAlign: "top",

                  fontSize: "12px",
                },
                rowStyle: {
                  fontSize: "12px",
                  verticalAlign: "top",
                },
              }}
              style={{
                boxShadow: "none",
                width: "100%",
                background: "none",
                fontSize: "13px",
              }}
              // icons={{Add: () => 'Add Row'}}
            />
            {/* <table className="table">
              <thead>
                <th></th>
                <th></th>
              </thead>
              <tbody>
                <tr>
                  <td>Rater</td>
                  <td>{data.RaterName}</td>
                  <td>Rating Date</td>
                  <td>{data.RatingDate}</td>
                </tr>
                <tr>
                  <td>Knowledge Rating</td>
                  <td>{data.KnowlegdeRating}</td>
                  <td>Knowledge Comment</td>
                  <td>{data.KnowlegdeComment}</td>
                </tr>
                <tr>
                  <td>Work Quality Rating</td>
                  <td>{data.WorkQualityRating}</td>
                  <td>Work Quality Comment</td>
                  <td>{data.WorkQualityComment}</td>
                </tr>
                <tr>
                  <td>Work Quantity Rating</td>
                  <td>{data.WorkQuantityRating}</td>
                  <td>Work Quantity Comment</td>
                  <td>{data.WorkQuantityComment}</td>
                </tr>
                <tr>
                  <td>Work Habit Rating</td>
                  <td>{data.WorkHabitRating}</td>
                  <td>Work Habit Comment</td>
                  <td>{data.WorkHabitComment}</td>
                </tr>
                <tr>
                  <td>Communicaton Rating</td>
                  <td>{data.CommunicatonRating}</td>
                  <td>Communicaton Comment</td>
                  <td>{data.CommunicatonComment}</td>
                </tr>
                <tr>
                  <td>Total Performance Score</td>
                  <td>{data.TotalPerformanceScore}</td>
                </tr>
              </tbody>
            </table> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminViewRating;
