import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { instanceAPI } from "../services/instances";
import PropTypes from "prop-types";
import UserContext from "./UserContext";
import { getTotalRuntime } from "../services/utils";
import { notifyError } from "../components/toasts/Toast";
import { useTranslation } from "react-i18next";

const ViewContext = createContext({});

export default ViewContext;

export function UserViews({ children }) {
  const { user } = useContext(UserContext);
  const [movieViews, setMovieViews] = useState([]);
  const [movieCount, setMovieCount] = useState(0);
  const [movieRuntime, setMovieRuntime] = useState(0);
  const [tvViews, setTvViews] = useState([]);
  const [tvCount, setTvCount] = useState(0);
  const [tvRuntime, setTvRuntime] = useState(0);
  const [sendView, setSendView] = useState(false);
  const { t } = useTranslation();

  const viewsObj = useMemo(() => {
    return {
      movieViews,
      movieCount,
      movieRuntime,
      tvViews,
      tvCount,
      tvRuntime,
      sendView,
      setSendView,
    };
  }, [
    movieViews,
    movieCount,
    movieRuntime,
    tvViews,
    tvCount,
    tvRuntime,
    sendView,
  ]);

  useEffect(() => {
    if (user.id) {
      instanceAPI
        .get(`/api/v1/user/view/movie/${user.id}?genre=`)
        .then(({ data }) => {
          setMovieViews(data);
          setMovieCount(data.length);
          setMovieRuntime(getTotalRuntime(data));
          setSendView(false);
        })
        .catch(() => notifyError(t("toast.error")));
    }
    if (user.id) {
      instanceAPI
        .get(`/api/v1/user/view/tv/${user.id}?genre=`)
        .then(({ data }) => {
          setTvViews(data);
          setTvCount(data.length);
          setTvRuntime(getTotalRuntime(data));
          setSendView(false);
        })
        .catch(() => notifyError(t("toast.error")));
    }
  }, [user.id, sendView, t]);

  return (
    <ViewContext.Provider value={viewsObj}>{children}</ViewContext.Provider>
  );
}

UserViews.propTypes = {
  children: PropTypes.element,
};
