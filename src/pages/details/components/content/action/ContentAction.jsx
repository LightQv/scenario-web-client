import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ViewContext from "../../../../../contexts/ViewContext";
import UserContext from "../../../../../contexts/UserContext";
import { useTranslation } from "react-i18next";
import { notifyError } from "../../../../../components/toasts/Toast";
import { instanceAPI } from "../../../../../services/instances";
import PropTypes from "prop-types";
import { useView } from "../../../../../hooks/useView";

export default function ContentAction({
  setShowModal,
  genres,
  poster,
  release,
  runtime,
  episodesNumber,
  title,
}) {
  const { type, id } = useParams();
  const { user } = useContext(UserContext);
  const { setSendView } = useContext(ViewContext);
  const { viewed, viewObj } = useView(id, type);
  const [genreIds, setGenreIds] = useState(genres);
  const { t } = useTranslation();

  //--- Add 0 to Genre Arr which represent "all" ---//
  useEffect(() => {
    const genre = genres.map((el) => el.id);
    genre.unshift(0);
    setGenreIds(genre);
  }, [genres]);

  //--- View Logic ---//
  const handleView = () => {
    if (viewed) {
      instanceAPI
        .delete(`/api/v1/view/${viewObj.id}`)
        .then(() => setSendView(true))
        .catch(() => notifyError(t("toast.error")));
    } else {
      instanceAPI
        .post(`/api/v1/view`, {
          tmdb_id: Number(id),
          genre_ids: genreIds,
          poster_path: poster,
          release_date: release,
          release_year: release.slice(0, 4),
          runtime: runtime | episodesNumber,
          title: title,
          media_type: type,
          viewerId: user.id,
        })
        .then(() => setSendView(true))
        .catch(() => notifyError(t("toast.error")));
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="h-fit w-full px-4 py-2 text-end text-xs text-theme-light-text-primary hover:bg-theme-light-bg-third dark:text-theme-dark-text-primary dark:hover:bg-theme-dark-bg-third"
      >
        {t("dropdown.media")}
      </button>
      <button
        type="button"
        onClick={() => handleView()}
        className={`h-fit w-full border-t-[1px] border-theme-light-bg-third px-4 py-2 text-end text-xs hover:bg-theme-light-bg-third dark:border-theme-dark-bg-third dark:hover:bg-theme-dark-bg-third ${
          viewed
            ? "text-theme-light-secondary dark:text-theme-dark-secondary"
            : "text-theme-light-text-primary dark:text-theme-dark-text-primary"
        }`}
      >
        {viewed ? t("dropdown.unview") : t("dropdown.view")}
      </button>
    </>
  );
}

ContentAction.propTypes = {
  setShowModal: PropTypes.func,
  genres: PropTypes.arrayOf(PropTypes.shape()),
  poster: PropTypes.string,
  release: PropTypes.string,
  runtime: PropTypes.number,
  episodesNumber: PropTypes.number,
  title: PropTypes.string,
};
