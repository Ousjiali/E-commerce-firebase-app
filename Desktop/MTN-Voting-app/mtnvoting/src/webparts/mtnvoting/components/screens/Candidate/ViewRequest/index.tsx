import * as React from "react";
import {
  Text,
  Header,
  Spinner,
  Textarea,
  Modal,
  CandidateNavigation,
} from "../../../containers";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import styles from "../Register/styles.module.scss";


const ViewRequest = ({ history }) => {
  const [data, setData] = React.useState({} as any);
  const [loading, setLoading] = React.useState(false);
  const [agenda, setAgenda] = React.useState("");
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    setLoading(true);
    sp.profiles.myProperties
      .get()

      .then((response) => {
        sp.web.lists
          .getByTitle(`Nominees`)
          .items.filter(`EmployeeEmail eq '${response.Email}'`)
          .get()
          .then((res) => {
            setData(res[0]);
            setLoading(false);
            // console.log(res);
            // setAgenda(res[0].Agenda);

            // console.log(res[0].Agenda, "this is it");
            // setList(res[0].Agenda.split("\n"));
          });
        sp.web.lists
          .getByTitle("Registration")
          .items.filter(`EmployeeEmail eq '${response.Email}'`)
          .get()
          .then((items) => {
            // console.log(items.length)
            //  if (items.length <= 0) {
            //    swal("Error", "You are have not registered", "error");
            //    history.push("/");
            //    return;
            //  }
          })
      });

  }, []);
  const info = data && data.Agenda ? data.Agenda : '["...loading"]';
  const resp = JSON.parse(info);

  const editHandler = () => {
    history.push(`/candidate/edit`);
  };
  console.log(list);
  return (
    <div className="appContainer">
      <CandidateNavigation viewRequest={`active`} />
      <div className="contentsRight">
        <Header title="My Request" />
        <div className="textContainer">
          <div className="viewFlex">
            <div className="photo">
              {data.PassportPhotograph && (
                <div>
                  <img src={data.PassportPhotograph} alt={data.EmployeeName} />
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className="textContainerFlex">
              <Text
                title="Employee Name"
                value={data.EmployeeName}
                size="small"
              />
              <Text
                title="Employee Email"
                value={data.EmployeeEmail}
                size="small"
              />
              <Text title="Status" value={data.Status} size="small" />
              <Text
                title="Date employed"
                value={data.DateEmployed}
                size="small"
              />
              <Text title="Region" value={data.Region} size="small" />
              <Text title="Location" value={data.Location} size="small" />
              <Text
                title="Constituency"
                value={data.Constituency}
                size="small"
              />
              
               <Text
                  title="Have you served on the council before "
                  value={data.ServedOnTheCouncil}
                />
                {data?.ServedOnTheCouncil === "Yes" && (
                  <>
                    <Text
                      title="Duration"
                      value={`${data?.StartDate} - ${data?.EndDate}`}
                    />
                  </>
                )}
               
                <Text
                  title="Do you have any disciplinary sanction"
                  value={data.DisciplinarySanction}
                />
               

                <ul className="marginLeftRight">
                  <p>State your five point agenda</p>
                  {resp && resp.map((item, i) => <li key={i}>{item}</li>)}
                </ul>


              <div className="minimizeBtn_">
                <button
                  onClick={editHandler}
                  className="mtn__btn mtn__yellow bg"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;