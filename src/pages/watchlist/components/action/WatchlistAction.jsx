import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

export default function WatchlistAction({
  setShowEdit,
  setShowModal,
  setShowModalDelete,
  type,
}) {
  const { t } = useTranslation();
  const isSystemWatchlist = type === "SYSTEM";

  return (
    <>
      <button
        type="button"
        onClick={() => setShowEdit(true)}
        className="h-fit w-full px-4 py-2 text-end text-xs text-theme-light-text-primary hover:bg-theme-light-bg-third dark:text-theme-dark-text-primary dark:hover:bg-theme-dark-bg-third"
      >
        {t("dropdown.watchlist.modify")}
      </button>
      {!isSystemWatchlist && (
        <>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="h-fit w-full border-t-[1px] border-theme-light-bg-third px-4 py-2 text-end text-xs text-theme-light-text-primary hover:bg-theme-light-bg-third dark:border-theme-dark-bg-third dark:text-theme-dark-text-primary dark:hover:bg-theme-dark-bg-third"
          >
            {t("dropdown.watchlist.rename")}
          </button>
          <button
            type="button"
            onClick={() => setShowModalDelete(true)}
            className="h-fit w-full border-t-[1px] border-theme-light-bg-third px-4 py-2 text-end text-xs text-theme-light-secondary hover:bg-theme-light-bg-third dark:border-theme-dark-bg-third dark:text-theme-dark-secondary dark:hover:bg-theme-dark-bg-third"
          >
            {t("dropdown.watchlist.delete")}
          </button>
        </>
      )}
    </>
  );
}

WatchlistAction.propTypes = {
  setShowEdit: PropTypes.func,
  setShowModal: PropTypes.func,
  setShowModalDelete: PropTypes.func,
  type: PropTypes.string,
};
