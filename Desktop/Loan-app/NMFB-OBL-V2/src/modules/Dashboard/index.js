import React, { useContext } from "react";
import {
  BsFillBookmarkXFill,
  BsFillCheckCircleFill,
  BsFillCursorFill,
  BsFillPatchQuestionFill,
} from "react-icons/bs";
import { Card, Chart } from "../../components";
import { AuthContext } from "../../context";
import Layout from "../../layout";
import { useAllLoan } from "./hooks";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const all = useAllLoan();
  const pending = all?.filter((x) => x.status === "Pending");
  const approved = all?.filter((x) => x.status === "Approved");
  const declined = all?.filter((x) => x.status === "Declined");
  console.log(all, "dashboard");
  return (
    <Layout name="Dashboard" pageTitle="Dashboard">
      <div className="welcomeBanner">
        <h1>Hello {user && user.firstName}</h1>
        <small>It's nice to see you again!</small>
      </div>
      <div className="dashboardItems">
        <div className="card-2">
          <div className="cardFlex">
            <Card
              Icon={BsFillCursorFill}
              title="Total no of loan requests"
              url="/"
              color="purple"
              colorInner="lightPurple"
              count={all?.length}
            />
            <Card
              Icon={BsFillPatchQuestionFill}
              title="Pending"
              url="/"
              color="gold"
              colorInner="lightGold"
              count={pending?.length}
            />
            <Card
              Icon={BsFillCheckCircleFill}
              title="Total no of approved loans"
              url="/"
              color="green"
              colorInner="lightGreen"
              count={approved?.length}
            />
            <Card
              Icon={BsFillBookmarkXFill}
              title="Total no of declined loans"
              url="/"
              color="crimson"
              colorInner="lightCrimson"
              count={declined?.length}
            />
          </div>
        </div>
        <div className="card-2">
          <div className="charts">
            <Chart
              approved={approved?.length}
              declined={declined?.length}
              pending={pending?.length}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
