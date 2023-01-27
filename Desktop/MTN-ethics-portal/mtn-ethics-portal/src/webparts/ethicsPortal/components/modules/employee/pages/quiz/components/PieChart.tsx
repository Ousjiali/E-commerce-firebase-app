import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getQuizContextState } from "../context/QuizContext";
import { colors } from "@material-ui/core";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = () => {
  const { result } = getQuizContextState();
  const labels = ["Correct", "Wrong"];

  const series = [result?.correct, result?.wrong];

  const fill = [colors.green[200], colors.red[200], colors.grey[200]];

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "",
      },
      toolbar: {
        display: false,
      },
      legend: {
        position: "bottom" as const,
        display: true,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: series,
        backgroundColor: fill,
      },
    ],
  };

  return <Pie data={data} options={options} />;
};
