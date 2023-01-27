import * as React from "react";
import {
  AdminNavigation,
  Card,
  AdminHeader,
  MenuBar,
  Input,
  Modal,
  Spinner,
  DateInput,
  Select,
  Helpers,
} from "../../../containers";
import MaterialTable from "material-table";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import styles from "./table.module.scss";
import style from "./step.module.scss";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Link } from "react-router-dom";

const AdminReport = ({ history }) => {
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
    { title: "Constituency", field: "Title", type: "string" as const },
    {
      title: "Date of Voting Exercise",
      field: "Date",
      type: "string" as const,
    },
  ]);

  const [data, setData] = React.useState([]);
  const [record, setRecord] = React.useState([]);
  const [newRecord, setNewRecord] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [regions, setRegions] = React.useState([]);
  const [region, setRegion] = React.useState("");
  const [Title, setTitle] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [NomineeCount, setNomineeCount] = React.useState(null);
  const [Nominees, setNominees] = React.useState([]);
  const [votes, setVotes] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [id, setID] = React.useState(null);
  const today = new Date().toJSON().slice(0, 10);

  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle(`Constituency`)
      .items.filter(`Status eq 'Open'`)
      .get()
      .then((res) => {
        setData(res);
        // setRecord(res);
        sp.web.lists
          .getByTitle(`Nominees`)
          .items.filter(`Status eq 'Approved'`)
          .get()
          .then((response) => {
            setRecord([res, response]);
          });
        sp.web.lists
          .getByTitle(`Votes`)
          .items.get()
          .then((res) => {
            setVotes(res);
          });
        setLoading(false);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("Constituency")
      .items.add({
        Title: Title,
        NomineeCount: NomineeCount,
        Date: Date,
        Region: region,
        Location: location,
        Country: country,
        Status: "Open",
      })
      .then((res) => {
        setOpen(false);
        swal("Success", "Voting Exercise added Successfully", "success");
        sp.web.lists
          .getByTitle(`Constituency`)
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

  const editHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("Constituency")
      .items.getById(id)
      .update({
        Title: Title,
        NomineeCount: NomineeCount,
        Date: Date,
        Region: region,
        Location: location,
        Country: country,
      })
      .then((res) => {
        setOpen(false);
        swal("Success", "Voting Exercise Edited Successfully", "success");
        sp.web.lists
          .getByTitle(`Constituency`)
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

  const stopHandler = (id) => {
    if (window.confirm("Are you sure you stop this exercise")) {
      sp.web.lists
        .getByTitle("Constituency")
        .items.getById(id)
        .update({
          Status: "Closed",
        })
        .then((res) => {
          setOpen(false);
          swal("Success", "Voting has Ended", "success");
          sp.web.lists
            .getByTitle(`Constituency`)
            .items.get()
            .then((res) => {
              setData(res);
            });
        })
        .catch((e) => {
          swal("Warning!", "An Error Occured, Try Again!", "error");
          console.error(e);
        });
    }
  };

  //   const voteCount = (id) => {
  //     sp.web.lists
  //       .getByTitle(`Nominees`)
  //       .items.filter(`Status eq 'Approved' and Constituency eq '${params}'`)
  //       .get()
  //       .then((res) => {
  //         setData(res);
  //         setLoading(false);
  //       });
  //     sp.web.lists
  //       .getByTitle(`Votes`)
  //       .items.get()
  //       .then((res) => {
  //         setVotes(res);
  //       });
  //     var count = votes.filter((x) => x.Nominee == id);
  //     console.log(count);
  //     return count.length;
  //   };

  const nominees = (name: any) => {
    let count = "";
    sp.web.lists
      .getByTitle(`Nominees`)
      .items.filter(`Status eq 'Approved' and Constituency eq '${name}'`)
      .get()
      .then((res) => {
        setNominees(res);
      });
    //  var count = votes.filter((x) => x.Nominee == id);
    return count;
  };

  const toggleHandler = (id) => {
    setNewRecord((txt) => ({
      ...txt,
      [id]: !txt[id],
    }));
  };

  const voteCount = (id) => {
    var count = votes.filter((x) => x.Nominee == id);
    console.log(count);
    return count.length;
  };

  const navigate = (id) => {
    history.push(`/admin/reports/${id}`);
  };
  return (
    <div className="appContainer">
      <AdminNavigation report={`active`} />
      <div className="contentsRight">
        <AdminHeader title="Reports" />
        {loading ? (
          <Spinner />
        ) : (
          <div className={style.tableContainer}>
            <div className="btnContainer right">
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="mtn__btn mtn__black"
                table="myTable"
                filename={`Election Results`}
                sheet="tablexls"
                buttonText="Download as XLS"
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Constituency</th>
                  <th>Date of Voting Exercise</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {record &&
                  record[0] &&
                  record[0].map((item, i) => (
                    <React.Fragment key={i}>
                      <tr>
                        <td>
                          <span
                            onClick={() => toggleHandler(i)}
                            style={{ cursor: "pointer" }}
                          >
                            +
                          </span>
                        </td>
                        <td>{item.Title}</td>
                        <td>{item.Date}</td>
                        <td>
                          <div className="btnContainer leftP">
                            <button
                              type="button"
                              onClick={() => stopHandler(item.ID)}
                              className="mtn__btn__table mtn__black"
                            >
                              Stop
                            </button>
                            <button
                              type="button"
                              onClick={() => navigate(item.Title)}
                              className="mtn__btn__table mtn__yellow"
                            >
                              View Results
                            </button>
                          </div>
                        </td>
                      </tr>
                      {newRecord[i] && (
                        <tr>
                          <td colSpan={4}>
                            <table>
                              <thead style={{ background: "yellow" }}>
                                <th></th>
                                <th>Name</th>
                                <th>Constituency</th>
                                <th>Vote</th>
                              </thead>
                              <tbody>
                                {record &&
                                  record[1] &&
                                  record[1]
                                    .filter(
                                      (x) => x.Constituency === item.Title
                                    )
                                    .map((items, i) => (
                                      <tr key={i}>
                                        <td></td>
                                        <td>{items.EmployeeName}</td>
                                        <td>{items.Constituency}</td>
                                        <td>{voteCount(items.ID)}</td>
                                      </tr>
                                    ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                <tr></tr>
              </tbody>
            </table>
            <table id="myTable" style={{ visibility: "hidden" }}>
              <thead>
                <tr>
                  <th>Constituency</th>
                  <th>Date of Voting Exercise</th>
                </tr>
              </thead>
              <tbody>
                {record &&
                  record[0] &&
                  record[0].map((item, i) => (
                    <React.Fragment key={i}>
                      <tr>
                        <td>{item.Title}</td>
                        <td>{item.Date}</td>
                      </tr>

                      <tr>
                        <td colSpan={2}>
                          <table>
                            <thead>
                              <th style={{ fontWeight: "bold" }}>Name</th>
                              <th style={{ fontWeight: "bold" }}>Vote</th>
                            </thead>
                            <tbody>
                              {record &&
                                record[1] &&
                                record[1]
                                  .filter((x) => x.Constituency === item.Title)
                                  .map((items, i) => (
                                    <tr key={i}>
                                      <td>{items.EmployeeName}</td>
                                      <td>{voteCount(items.ID)}</td>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                <tr></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReport;
