import { useParams } from "react-router-dom";
import { useContext } from "react";
import ViewContext from "../../../../../contexts/ViewContext";
import UserContext from "../../../../../contexts/UserContext";
import { useTranslation } from "react-i18next";
import { notifyError } from "../../../../../components/toasts/Toast";
import { instanceAPI } from "../../../../../services/instances";
import PropTypes from "prop-types";
import { useView } from "../../../../../hooks/useView";

export default function ContentAction({
  setShowModal,
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
  const { t } = useTranslation();

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
          dataId: Number(id),
          poster_path: poster,
          release_date: release,
          release_year: release.slice(0, 4),
          runtime: runtime | episodesNumber,
          title: title,
          type: type,
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
  poster: PropTypes.string,
  release: PropTypes.string,
  runtime: PropTypes.number,
  episodesNumber: PropTypes.number,
  title: PropTypes.string,
};
