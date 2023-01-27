import Edit from "@material-ui/icons/Edit";
import MaterialTable from "material-table";
import { IconButton } from "office-ui-fabric-react";
import * as React from "react";
import { QuizQuestion } from "../types/admin-quiz-create-type";
import { CloseSharp, RemoveRedEye } from "@material-ui/icons";
import { CreateAdminQuizContextData } from "../context/AdminQuizContext";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../../../shared/components/TableCompHelpers";

type Props = {
  questions: QuizQuestion[];
  onUpdate: React.Dispatch<QuizQuestion>;
};

export const QuestionsTable: React.FC<Props> = ({ questions, onUpdate }) => {
  const { quiz, setQuiz } = CreateAdminQuizContextData();
  const columns = [
    {
      title: "SN",
      field: "tableData[id]",
      render: (rowData) => <div>{rowData?.tableData?.id + 1}</div>,
    },
    { title: "Question", field: "question" },
    { title: "Question Type", field: "type" },
    {
      title: "Options",
      render: (rowData) => <div>{rowData?.options?.join(", ")}</div>,
    },
    {
      title: "Correct Option",
      field: "answer",
    },
    {
      title: "Weight",
      field: "point",
    },
  ];
  return (
    <MaterialTable
      icons={TableIcons}
      title={`All Questions`}
      columns={columns}
      data={questions}
      options={{
        exportButton: { csv: true, pdf: false },
        actionsCellStyle: {
          color: "#FF00dd",
        },

        actionsColumnIndex: -1,
        pageSize: 3,
        pageSizeOptions: [1, 3, 5],
        search: false,
        exportAllData: true,
        exportFileName: "Questions",
        headerStyle: TableHeaderStyles,
        maxBodyHeight: "60vh",
      }}
      style={{ ...TableStyles, marginBottom: "1.5rem" }}
      actions={[
        {
          icon: "visibility",
          iconProps: {
            style: { fontSize: "20px", color: "gold" },
          },
          tooltip: "edit",

          onClick: (event, rowData: QuizQuestion) => {
            onUpdate(rowData);
          },
        },

        {
          icon: "visibility",
          iconProps: {
            style: { fontSize: "20px", color: "gold" },
          },
          tooltip: "remove",

          onClick: (event, rowData) => {
            const filtered = questions.filter(
              (question) => question !== rowData
            );
            setQuiz({
              ...quiz,
              questions: [...filtered],
            });
          },
        },
      ]}
      components={{
        Action: (props) => (
          <IconButton
            onClick={(event) => props?.action?.onClick(event, props?.data)}
            style={{
              width: "25px",
              height: "25px",
              fontSize: ".5rem",
              padding: "1rem",
            }}
            color={
              props?.action?.tooltip === "view"
                ? "primary"
                : props?.action?.tooltip === "edit"
                ? "default"
                : "secondary"
            }
          >
            {props?.action?.tooltip === "view" ? (
              <RemoveRedEye />
            ) : props?.action?.tooltip === "edit" ? (
              <Edit />
            ) : (
              <CloseSharp />
            )}
          </IconButton>
        ),
      }}
    />
  );
};
