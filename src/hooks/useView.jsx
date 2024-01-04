import { useContext, useLayoutEffect, useState } from "react";
import ViewContext from "../contexts/ViewContext";
import UserContext from "../contexts/UserContext";

export function useView(dataId, parameter) {
  const { user } = useContext(UserContext);
  const { movieViews, tvViews } = useContext(ViewContext);
  const [viewed, setViewed] = useState(false);
  const [viewObj, setViewObj] = useState({});

  useLayoutEffect(() => {
    function verifyView() {
      const isViewed =
        parameter === "movie"
          ? movieViews?.some(
              (el) => el.dataId === Number(dataId) && el.viewerId === user.id
            )
          : tvViews?.some(
              (el) => el.dataId === Number(dataId) && el.viewerId === user.id
            );
      setViewed(isViewed);
    }

    function getViewObj() {
      const viewObj =
        parameter === "movie"
          ? movieViews?.find(
              (el) => el.dataId === Number(dataId) && el.viewerId === user.id
            )
          : tvViews?.find(
              (el) => el.dataId === Number(dataId) && el.viewerId === user.id
            );
      setViewObj(viewObj);
    }
    verifyView();
    getViewObj();
  }, [dataId, parameter, movieViews, tvViews, user.id]);

  return { viewed, viewObj };
}
