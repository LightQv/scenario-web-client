import { useContext, useEffect, useState } from "react";
import ThemeContext from "../../../../contexts/ThemeContext";
import ViewContext from "../../../../contexts/ViewContext";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

export default function ViewPercentage() {
  const { darkTheme } = useContext(ThemeContext);
  const { movieCount, tvCount } = useContext(ViewContext);
  const [totalCount, setTotalCount] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    setTotalCount(movieCount + tvCount);
  }, [movieCount, tvCount]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: t("chart.percentage.title"),
        font: {
          weight: "normal",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label} ${Math.round(context.parsed.y)}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
        grid: {
          color: darkTheme ? "#1D1F23" : "#F7F7F7",
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          color: darkTheme ? "#5a606c" : "#E5E7EB",
        },
        border: { color: darkTheme ? "#5a606c" : "#E5E7EB" },
      },
    },
  };

  const data = {
    labels: [t("chart.percentage.label")],
    datasets: [
      {
        label: t("chart.percentage.movie"),
        data: [(movieCount * 100) / totalCount, 100],
        backgroundColor: darkTheme ? "#f9cd4a" : "#eab208",
        borderWidth: 1,
        borderColor: darkTheme ? "#f9cd4a" : "#eab208",
      },
      {
        label: t("chart.percentage.tv"),
        data: [(tvCount * 100) / totalCount, 100],
        backgroundColor: darkTheme ? "#c92c35" : "#EA0B17",
        borderWidth: 1,
        borderColor: darkTheme ? "#EA0B17" : "#c92c35",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
