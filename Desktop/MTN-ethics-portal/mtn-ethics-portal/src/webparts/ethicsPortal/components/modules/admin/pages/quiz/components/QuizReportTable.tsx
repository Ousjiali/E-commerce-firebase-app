import * as React from "react";
import MaterialTable from "material-table";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../../../shared/components/TableCompHelpers";

type Props = { quizReport: any[]; column: any[]; title: string };

export const QuizReportTable: React.FC<Props> = ({
  quizReport,
  column,
  title,
}) => {
  return (
    <MaterialTable
      icons={TableIcons}
      title={title}
      columns={column}
      data={quizReport}
      options={{
        exportButton: { csv: true, pdf: false },
        actionsCellStyle: {
          color: "#FF00dd",
        },

        actionsColumnIndex: -1,
        pageSize: 5,
        pageSizeOptions: [5, 10, 20, 30],
        exportAllData: true,
        exportFileName: "Quiz Report",
        headerStyle: TableHeaderStyles,
      }}
      style={TableStyles}
    />
  );
};
