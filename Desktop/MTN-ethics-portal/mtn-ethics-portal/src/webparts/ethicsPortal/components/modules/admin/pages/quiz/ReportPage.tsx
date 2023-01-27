import { Box } from "@material-ui/core";
import { sp } from "@pnp/sp";
import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { errorAlert } from "../../../../utils/toast-messages";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";
import { QuizReportTable } from "./components/QuizReportTable";
import { QuizStatus } from "./modals/EnableQuizPromptModal";

export const ReportPage = () => {
  const [quizReport, setQuizReport] = React.useState<any[]>([]);
  const toast = useToasts().addToast;
  React.useEffect(() => {
    (async () => {
      try {
        const res = await sp.web.lists
          .getByTitle("QuizResponse")
          .items.select(
            "Quiz/QuizTitle, Quiz/duration, Quiz/status, StaffName, StaffEmail, score, TotalPoints, ExpectedScore, Created, duration"
          )
          .expand("Quiz")
          .getAll();

        setQuizReport(res);
      } catch (e) {
        errorAlert(toast);
      }
    })();
  }, []);

  const columns = [
    {
      title: "SN",
      field: "tableData[id]",
      render: (rowData) => <div>{rowData?.tableData?.id + 1}</div>,
    },
    { title: "Staff Name", field: "StaffName" },
    { title: "Staff Email Address", field: "StaffEmail" },
    { title: "Quiz Title", field: "Quiz[QuizTitle]" },
    {
      title: "Quiz Status",
      field: "Quiz[status]",
      render: (rowData) => (
        <>
          {rowData?.Quiz?.status === QuizStatus.Is_Enabled
            ? "Running"
            : "Disabled"}
        </>
      ),
    },
    {
      title: "Staff Score",
      field: "TotalPoints",
    },
    {
      title: "Expected Score",
      field: "ExpectedScore",
    },
    {
      title: "TimeStamp",
      field: "Created",
      type: "datetime",
    },
    {
      title: "Time Spent",
      field: "duration",
    },
  ];

  return (
    <AdminWrapper>
      <Container style={{ minHeight: "100vh" }}>
        <QuizReportTable
          quizReport={quizReport}
          column={columns}
          title="All Participants Report"
        />
      </Container>
    </AdminWrapper>
  );
};
