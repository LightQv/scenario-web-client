import { useContext, useEffect, useState } from "react";
import ThemeContext from "../../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import UserContext from "../../../../contexts/UserContext";
import { instanceAPI } from "../../../../services/instances";
import { notifyError } from "../../../../components/toasts/Toast";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function DecadeCount() {
  const { darkTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const [movieViews, setMovieViews] = useState([]);
  const [tvViews, setTvViews] = useState([]);
  const [minYear, setYearMin] = useState(0);
  const [maxYear, setMaxYear] = useState(0);
  const [maxCount, setMaxCount] = useState(0);
  const [labelsDate, setLabelsDate] = useState([]);
  const { t } = useTranslation();

  // Fetch Movie & Tv view count groupBy year
  useEffect(() => {
    if (user.id) {
      instanceAPI
        .get(`/api/v1/stats/year/movie/${user.id}`)
        .then(({ data }) => {
          setMovieViews(data);
        })
        .catch(() => notifyError(t("toast.error")));
    }
    if (user.id) {
      instanceAPI
        .get(`/api/v1/stats/year/tv/${user.id}`)
        .then(({ data }) => {
          setTvViews(data);
        })
        .catch(() => notifyError(t("toast.error")));
    }
  }, [user, t]);

  //--- Get Lowest, Highest year & Max count to scale the chart ---//
  useEffect(() => {
    function getLowestYear() {
      const highestMovieYear = Math.min(
        ...movieViews.map((el) => {
          return el.release_year;
        })
      );
      const highestTvYear = Math.min(
        ...tvViews.map((el) => {
          return el.release_year;
        })
      );

      setYearMin(Math.min(highestMovieYear, highestTvYear));
    }

    function getHighestYear() {
      const highestMovieYear = Math.max(
        ...movieViews.map((el) => {
          return el.release_year;
        })
      );
      const highestTvYear = Math.max(
        ...tvViews.map((el) => {
          return el.release_year;
        })
      );

      setMaxYear(Math.max(highestMovieYear, highestTvYear));
    }

    function getHighestCount() {
      const highestMovieYear = Math.max(
        ...movieViews.map((el) => {
          return el._count;
        })
      );
      const highestTvYear = Math.max(
        ...tvViews.map((el) => {
          return el._count;
        })
      );

      setMaxCount(Math.max(highestMovieYear, highestTvYear));
    }

    getLowestYear();
    getHighestYear();
    getHighestCount();
  }, [movieViews, tvViews]);

  //--- Use Lowest and Highest Year to create Label's array ---//
  useEffect(() => {
    function getLabels(min, max) {
      let list = [];
      for (let i = min; i <= max; i += 5) {
        list.push(i);
      }
      setLabelsDate(list.map((el) => new Date(el, 0)));
    }

    getLabels(Math.floor(minYear / 10) * 10, Math.ceil(maxYear / 10) * 10);
  }, [minYear, maxYear]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: t("chart.decade.title"),
        font: {
          weight: "normal",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: Math.ceil(maxCount / 10) * 10,
        grid: {
          color: darkTheme ? "#1D1F23" : "#F7F7F7",
        },
        border: { color: darkTheme ? "#5a606c" : "#E5E7EB" },
      },
      x: {
        type: "time",
        time: {
          unit: "year",
          tooltipFormat: "YYYY",
          parsing: false,
        },
        grid: {
          color: darkTheme ? "#1D1F23" : "#F7F7F7",
        },
        border: { color: darkTheme ? "#5a606c" : "#E5E7EB" },
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  const data = {
    labels: labelsDate,
    datasets: [
      {
        label: t("chart.decade.movie"),
        data: movieViews.map((el) => {
          return { x: new Date(el.release_year, 0), y: el._count };
        }),
        backgroundColor: darkTheme ? "#f9cd4a" : "#eab208",
        borderWidth: 1,
        borderColor: darkTheme ? "#f9cd4a" : "#eab208",
      },
      {
        label: t("chart.decade.tv"),
        data: tvViews.map((el) => {
          return { x: new Date(el.release_year, 0), y: el._count };
        }),
        backgroundColor: darkTheme ? "#c92c35" : "#EA0B17",
        borderWidth: 1,
        borderColor: darkTheme ? "#EA0B17" : "#c92c35",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
