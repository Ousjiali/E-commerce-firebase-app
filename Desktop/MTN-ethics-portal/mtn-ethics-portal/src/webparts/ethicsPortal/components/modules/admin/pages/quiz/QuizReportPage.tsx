import { Box, Button, Typography } from "@material-ui/core";
import { sp } from "@pnp/sp";
import * as React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useParams, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { errorAlert } from "../../../../utils/toast-messages";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";
import { QuizReportTable } from "./components/QuizReportTable";
import { QuizStatus } from "./modals/EnableQuizPromptModal";

export const QuizReportPage = () => {
  const { quizId } = useParams();
  const [quizReport, setQuizReport] = React.useState<any[]>([]);
  const [quizTitle, setQuizTitle] = React.useState("");
  const toast = useToasts().addToast;
  const history = useHistory();
  React.useEffect(() => {
    if (!quizId) return;
    (async () => {
      try {
        const res = await sp.web.lists
          .getByTitle("QuizResponse")
          .items.select(
            "Quiz/QuizTitle, Quiz/duration, Quiz/status, StaffName, responses, StaffEmail, score, TotalPoints, ExpectedScore, Created, duration"
          )
          .expand("Quiz")
          .filter(`QuizId eq '${quizId}'`)
          .get();

        if (res?.length) {
          setQuizReport(res);
        }
      } catch (e) {
        errorAlert(toast);
      }
    })();
  }, [quizId]);

  const [field, setField] = React.useState([]);
  const [questionsArr, setQuestions] = React.useState([]);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("QuizQuestions")
      .items.getById(quizId)
      .get()
      .then((questions) => {
        setQuizTitle(questions?.QuizTitle);
        setQuestions(
          questions?.questions ? JSON.parse(questions?.questions) : []
        );
      });
  }, [quizId]);

  let ans = {} as any;
  const getAnswer = (id: string | number) => {
    if (!quizReport.length) return;
    const found = quizReport.map(
      (responses) => responses?.responses && JSON.parse(responses?.responses)
    );
    let start = 0;

    while (start < found.length) {
      const res = found[start].find((it) => it.id === id);
      if (res) {
        console.log(res);
        break;
      }
      start++;
    }
    return ans;
  };

  // const optimizedFunctionToGetAnswer = React.useMemo(()=>getAnswer(id:string|number)=)

  const answersToQuestionsArr = () => {
    const obj = [];

    for (let i = 0; i < questionsArr?.length; i++) {
      obj.push({
        title: questionsArr[i].question,
        field: `${getAnswer(questionsArr[i].id)}`,
        type: "string",
        // export: true,
        hidden: true,
      });
    }

    return obj;
  };

  React.useMemo(() => {
    questionsArr?.length && setField(answersToQuestionsArr());
  }, [questionsArr, quizReport]);

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
    ...field,
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
        {quizReport ? (
          <QuizReportTable
            quizReport={quizReport}
            column={columns}
            title={`${quizTitle} Quiz Participants`}
          />
        ) : (
          <QuizReportTable
            quizReport={[]}
            column={columns}
            title={`${quizTitle} Quiz Participants`}
          />
        )}
      </Container>
    </AdminWrapper>
  );
};
