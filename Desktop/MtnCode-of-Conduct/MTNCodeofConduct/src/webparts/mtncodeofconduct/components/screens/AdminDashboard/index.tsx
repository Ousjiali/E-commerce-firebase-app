import * as React from "react";
import { AdminCard, Chart, Navigation, Spinner } from "../../Containers";
import { sp } from "@pnp/sp";
// import { GrCompliance } from "react-icons/gr";
import styles from "./styles.module.scss";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsFillFileRuledFill } from "react-icons/bs";
import { MdLocalOffer } from "react-icons/md";

const AdminDashboard = () => {
  const [data, setData] = React.useState({ DisplayName: "", Email: "" });

  const [loading, setLoading] = React.useState(false);
  const [complianceStatus, setComplianceStatus] = React.useState(0);
  const [reportLog, setReportLog] = React.useState(0);
  const [divisions, setDivisions] = React.useState(0);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`PledgeRegistration`)
      .items.get()
      .then((res) => {
        setComplianceStatus(res.length);
        // const pend = res.filter((x) => x.ConfirmationStatus === "Pending")
        // const comp = res.filter((x) => x.ConfirmationStatus === "Completed")
        setReportLog(res.length);
        setDivisions(res.length);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setData(response);
    });
  }, []);

  return (
    <div className="appContainer">
      <Navigation dashboard={`active`} />
      <div className="contentsRight">
        <div className="contentPage">
          <div className="dashboard">
            <div className="header__title">
              <h3>Hello !!!</h3>
              <h3>{data.DisplayName}</h3>
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div className="cardContainer">
                  <div className={styles.mtn__dashboardCard}>
                    <AdminCard
                      title="Compliance Status"
                      Icon={BsFillFileRuledFill}
                      url="/"
                      count={complianceStatus}
                    />
                    <AdminCard
                      title="Report Log"
                      Icon={AiOutlineFileDone}
                      url="/"
                      count={reportLog}
                    />
                    <AdminCard
                      title="Division"
                      Icon={MdLocalOffer}
                      url="/"
                      count={divisions}
                    />
                  </div>
                </div>
                <div>
                  <Chart
                    complianceStatus={complianceStatus}
                    reportLog={reportLog}
                    divisions={divisions}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
