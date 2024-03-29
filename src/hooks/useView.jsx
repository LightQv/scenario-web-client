import { useContext, useLayoutEffect, useState } from "react";
import ViewContext from "../contexts/ViewContext";
import UserContext from "../contexts/UserContext";

export function useView(tmdb_id, parameter) {
  const { user } = useContext(UserContext);
  const { movieViews, tvViews } = useContext(ViewContext);
  const [viewed, setViewed] = useState(false);
  const [viewObj, setViewObj] = useState({});

  useLayoutEffect(() => {
    function verifyView() {
      let isViewed = [];
      if (parameter === "movie") {
        isViewed = movieViews?.some(
          (el) => el.tmdb_id === Number(tmdb_id) && el.viewerId === user.id
        );
      }
      if (parameter === "tv") {
        isViewed = tvViews?.some(
          (el) => el.tmdb_id === Number(tmdb_id) && el.viewerId === user.id
        );
      }
      if (parameter === null) {
        let totalViews = movieViews.concat(tvViews);
        isViewed = totalViews?.some(
          (el) => el.tmdb_id === Number(tmdb_id) && el.viewerId === user.id
        );
      }
      setViewed(isViewed);
    }

    function getViewObj() {
      const viewObj =
        parameter === "movie"
          ? movieViews?.find(
              (el) => el.tmdb_id === Number(tmdb_id) && el.viewerId === user.id
            )
          : tvViews?.find(
              (el) => el.tmdb_id === Number(tmdb_id) && el.viewerId === user.id
            );
      setViewObj(viewObj);
    }
    verifyView();
    getViewObj();
  }, [tmdb_id, parameter, movieViews, tvViews, user.id]);

  return { viewed, viewObj };
}
