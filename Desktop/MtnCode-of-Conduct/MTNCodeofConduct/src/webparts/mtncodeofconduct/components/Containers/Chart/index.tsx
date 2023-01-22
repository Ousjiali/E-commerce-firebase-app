import * as React from "react";
import ReactECharts from "echarts-for-react";
import styles from "./chart.module.scss";

const Chart = ({ complianceStatus = 0, reportLog = 0, divisions = 0 }) => {
  const option = {
    tooltip: {
      trigger: "item",
    },

    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Reports",
        type: "pie",
        radius: "50%",
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "20",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        color: ["#FFC423", "#A09E9E", "#006993"],
        data: [
          { value: complianceStatus, name: "Compliance Status" },
          { value: reportLog, name: "  Report Log" },
          { value: divisions, name: "Divisions" },
        ],
      },
    ],
  };
  return (
    <div className={styles.charts}>
      <ReactECharts
        option={option}
        style={{ height: "700px", width: "100%" }}
      />
    </div>
  );
};

export default Chart;
