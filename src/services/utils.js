import i18n from "./i18n";

export default function formatDate(date) {
  const options = {
    year: "numeric",
  };
  return new Date(date).toLocaleDateString(i18n.language, options);
}

export function formatFullDate(date) {
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString(i18n.language, options);
}

export function setScoreColor(score) {
  if (score <= 3.99) return "bg-grade-light-bad dark:bg-grade-dark-bad";
  if (score >= 4 && score <= 6.99)
    return "bg-grade-light-average dark:bg-grade-dark-average";
  if (score >= 7 && score <= 8.49)
    return "bg-grade-light-good dark:bg-grade-dark-good";
  if (score >= 8.4)
    return "bg-grade-light-excellent dark:bg-grade-dark-excellent";
  return "bg-gray-400";
}

export function getDirectorName(crew) {
  for (let i = 0; i < crew.length; i++) {
    if (crew[i].job === "Director") return crew[i].name;
  }
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export function durationConvert(time) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${padTo2Digits(hours)}h${padTo2Digits(minutes)}`;
}

export const getTotalRuntime = (data) => {
  let total = 0;
  data.forEach((el) => (total += el.runtime));
  return total;
};

export function runtimeConvert(time) {
  const minutesToMs = time * 60000;

  let seconds = Math.floor(minutesToMs / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let weeks = Math.floor(days / 7);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;
  days = days % 7;
  weeks = weeks % 52;

  if (weeks >= 1 && days >= 1) {
    return `${padTo2Digits(weeks)} ${
      padTo2Digits(weeks) > 1
        ? i18n.t("stats.durationWeeks")
        : i18n.t("stats.durationWeek")
    } ${padTo2Digits(days)} ${
      padTo2Digits(days) > 1
        ? i18n.t("stats.durationDays")
        : i18n.t("stats.durationDay")
    } ${padTo2Digits(hours) + "h"}${padTo2Digits(minutes)}`;
  }
  if (weeks >= 1) {
    return `${padTo2Digits(weeks)} ${
      padTo2Digits(weeks) > 1
        ? i18n.t("stats.durationWeeks")
        : i18n.t("stats.durationWeek")
    } ${padTo2Digits(hours) + "h"}${padTo2Digits(minutes)}`;
  }
  if (days >= 1) {
    return `${padTo2Digits(days)} ${
      padTo2Digits(days) > 1
        ? i18n.t("stats.durationDays")
        : i18n.t("stats.durationDay")
    } ${padTo2Digits(hours) + "h"}${padTo2Digits(minutes)}`;
  }
  if (hours >= 1) {
    return `${padTo2Digits(hours) + "h"}${padTo2Digits(minutes)}`;
  }
  return `${minutes} min`;
}
