import { Box, IconButton, Tooltip } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import MaterialTable from "material-table";
import * as React from "react";
import { AdminQuizCreateType } from "../types/admin-quiz-create-type";
import { CloseSharp, RemoveRedEye } from "@material-ui/icons";
import { useToasts } from "react-toast-notifications";
import { sp } from "@pnp/sp";
import { errorAlert, successAlert } from "../../../../../utils/toast-messages";
import {
  EnableQuizPromptModal,
  QuizStatus,
} from "../modals/EnableQuizPromptModal";
import { CreateAdminQuizContextData } from "../context/AdminQuizContext";
import { useHistory } from "react-router-dom";
import { DeleteQuizModal } from "../modals/DeleteQuizModal";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../../../shared/components/TableCompHelpers";

type Props = {
  quizzes: any[];
  onUpdate: React.Dispatch<any>;
};

export const QuizTable: React.FC<Props> = ({ quizzes, onUpdate }) => {
  const { setQuiz, setIsUpdating } = CreateAdminQuizContextData();
  const history = useHistory();
  const [enabling, setEnabling] = React.useState(false);
  const [openEnablingModal, setEnablingModal] = React.useState(false);
  const [openDisablingModal, setDisablingModal] = React.useState(false);
  const [disabling, setDisabling] = React.useState(false);
  const [item, setItem] = React.useState<number>();
  const [itemToRemove, setItemToRemove] = React.useState<any>();

  const columns = [
    {
      title: "SN",
      field: "tableData",
      render: (rowData) => <div>{rowData.tableData.id + 1}</div>,
    },
    { title: "Quiz Title", field: "QuizTitle" },
    { title: "Quiz ID", field: "QuizId" },
    { title: "Duration (Minutes)", field: "duration" },
    { title: "Quiz Area", field: "area" },
    { title: "Quiz Topic", field: "topic" },
    {
      title: "Start Date",
      field: "startDate",
      render: (rowData) => (
        <>{new Date(rowData.startDate).toLocaleDateString()}</>
      ),
    },
    {
      title: "End Date",
      field: "endDate",
      render: (rowData) => (
        <>{new Date(rowData.endDate).toLocaleDateString()}</>
      ),
    },
    {
      title: "Number of Submissions",
      field: "count",
    },
  ];

  const toast = useToasts().addToast;

  const enableQuizHandler = async (id: number) => {
    setEnabling(true);
    try {
      const findRunningQuizzes = await sp.web.lists
        .getByTitle("QuizQuestions")
        .items.filter(`status eq '${QuizStatus.Is_Enabled}'`)
        .get();
      if (findRunningQuizzes.length > 0) {
        errorAlert(toast, "A quiz is already running. Stop it to continue.");
        setEnabling(false);
      } else {
        const res = await sp.web.lists
          .getByTitle("QuizQuestions")
          .items.getById(id)
          .update({
            status: QuizStatus.Is_Enabled,
          });
        onUpdate(res);
        setEnabling(false);
        successAlert(toast, "Quiz now running!").then(() => {
          setItem(null);
        });
      }
    } catch (e) {
      setEnabling(false);
      errorAlert(toast);
    }
  };
  const disableQuizHandler = async (id: number) => {
    setDisabling(true);
    try {
      const res = await sp.web.lists
        .getByTitle("QuizQuestions")
        .items.getById(id)
        .update({
          status: QuizStatus.Is_Disabled,
        });
      onUpdate(res);
      setDisabling(false);
      setItem(null);
      successAlert(toast, "Quiz stopped!");
    } catch (e) {
      setDisabling(false);
      errorAlert(toast);
    }
  };

  return (
    <>
      <MaterialTable
        icons={TableIcons}
        title={`All quizzes`}
        columns={columns}
        data={quizzes}
        isLoading={enabling || disabling}
        options={{
          exportButton: { csv: true, pdf: false },
          actionsCellStyle: {
            color: "#FF00dd",
          },

          actionsColumnIndex: -1,
          pageSize: 5,
          pageSizeOptions: [1, 2, 5],
          exportAllData: true,
          exportFileName: "Quizzes",
          headerStyle: TableHeaderStyles,
        }}
        style={TableStyles}
        actions={[
          {
            icon: "visibility",
            iconProps: {
              style: { fontSize: "20px", color: "gold" },
            },
            tooltip: "view participants",

            onClick: (event, rowData) => {
              history.push(`quiz/${rowData?.Id}/report`);
            },
          },
          {
            icon: "visibility",
            iconProps: {
              style: { fontSize: "20px", color: "gold" },
            },
            tooltip: "edit",

            onClick: (event, rowData) => {
              setIsUpdating(true);
              setQuiz({
                area: rowData.area,
                duration: rowData?.duration,
                ID: rowData.ID,
                endDate: rowData.endDate,
                instruction: rowData.instruction,
                //@ts-ignore
                questions: JSON.parse(rowData.questions),
                startDate: rowData?.startDate,
                title: rowData?.QuizTitle,
                topic: rowData?.topic,
                isShuffle: rowData?.Shuffled,
              });
              history.push("/admin/create-quiz");
            },
          },
          {
            icon: "visibility",
            iconProps: {
              style: { fontSize: "20px", color: "gold" },
            },
            tooltip: "remove",

            onClick: (event, rowData) => {
              setItemToRemove({
                QuizId: rowData.ID,
                QuizTitle: rowData.QuizTitle,
              });
            },
          },
          {
            icon: "visibility",
            iconProps: {
              style: { fontSize: "20px", color: "gold" },
            },
            tooltip: "",

            onClick: (event, rowData) => {
              event.preventDefault();
              if (rowData.status === QuizStatus.Is_Enabled) {
                setItem(rowData?.ID);
                setDisablingModal(true);
              } else {
                setEnablingModal(true);
                setItem(rowData?.ID);
              }
            },
          },
        ]}
        components={{
          Action: (props) => {
            return (
              <Box display="flex" alignItems="center" style={{ gap: "1rem" }}>
                <Tooltip title={props.action.tooltip}>
                  <IconButton
                    disabled={
                      (props?.data?.status === QuizStatus.Is_Enabled &&
                        props.action.tooltip === "remove") ||
                      (props?.data?.status === QuizStatus.Is_Enabled &&
                        props.action.tooltip === "edit")
                    }
                    onClick={(event) => props.action.onClick(event, props.data)}
                    style={{
                      width: "25px",
                      height: "25px",
                      fontSize: ".5rem",
                      padding: "1rem",
                      position: "relative",
                    }}
                    color={
                      props.action.tooltip === "view participants"
                        ? "primary"
                        : props.action.tooltip === "edit"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {props.action.tooltip === "view participants" ? (
                      <RemoveRedEye />
                    ) : props.action.tooltip === "edit" ? (
                      <Edit />
                    ) : props.action.tooltip === "remove" ? (
                      <CloseSharp />
                    ) : (
                      <>
                        {props?.data?.status === QuizStatus.Is_Enabled
                          ? "Turn Off"
                          : "Turn On"}
                      </>
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            );
          },
        }}
      />
      {openDisablingModal && (
        <EnableQuizPromptModal
          open={true}
          onClose={(response) => {
            setDisablingModal(false);
            if (response) {
              disableQuizHandler(item);
            }
          }}
          type={"disable" as QuizStatus}
        />
      )}

      {openEnablingModal && (
        <EnableQuizPromptModal
          open={true}
          onClose={(response) => {
            setEnablingModal(false);
            if (response) {
              enableQuizHandler(item);
            }
          }}
          type={"enable" as QuizStatus}
        />
      )}

      {itemToRemove && (
        <DeleteQuizModal
          QuizId={itemToRemove?.QuizId}
          QuizTitle={itemToRemove?.QuizTitle}
          onClose={(res) => {
            setItemToRemove(null);
            if (res) {
              onUpdate(res);
            }
          }}
          open={true}
        />
      )}
    </>
  );
};
