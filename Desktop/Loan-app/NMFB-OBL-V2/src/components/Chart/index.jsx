import React from "react";
import ReactECharts from "echarts-for-react";

const Chart = ({ approved = 0, pending = 0, declined = 0 }) => {
  const option = {
    title: {
      text: "OBL Loan Report",
      subtext: "Loan Status",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Loan Report",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        data: [
          { value: pending, name: "Pending" },
          { value: approved, name: "Approved" },
          { value: declined, name: "Declined" },
        ],
        // emphasis: {
        //   itemStyle: {
        //     shadowBlur: 10,
        //     shadowOffsetX: 0,
        //     shadowColor: "rgba(0, 0, 0, 0.5)",
        //   },
        // },
      },
    ],
    color: ["gold", "#5cb85c", "#d9534f"],
  };
  return (
    <div>
      <ReactECharts
        option={option}
        style={{ height: "500px", width: "100%" }}
      />
    </div>
  );
};

export default Chart;
