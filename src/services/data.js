import i18n from "./i18n";

// Navigation Data
export const navData = [
  { id: 1, name: "movie", title: i18n.t("navigation.link2.button1") },
  { id: 2, name: "tv", title: i18n.t("navigation.link2.button2") },
];

export const loggedData = [
  { id: 1, path: "/watchlist", title: i18n.t("navigation.link4") },
  { id: 2, path: "/profile", title: i18n.t("navigation.link5") },
];

// Sort Query Data
export const sortArr = [
  {
    id: 1,
    value: "popularity.desc",
    label: i18n.t("sort.option1"),
  },
  {
    id: 2,
    value: "primary_release_date.desc",
    label: i18n.t("sort.option2"),
  },
  {
    id: 3,
    value: "vote_average.desc",
    label: i18n.t("sort.option3"),
  },
];
