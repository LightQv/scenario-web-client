import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { instanceAPI } from "../../../../services/instances";
import {
  notifyError,
  notifySuccess,
} from "../../../../components/toasts/Toast";
import SubmitBtn from "../../../../components/ui/SubmitBtn";
import PropTypes from "prop-types";

export default function DeleteWatchlist({ elRef, setShowModal }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const deleteWatchlist = async () => {
    if (id) {
      try {
        const res = await instanceAPI.delete(`/api/v1/watchlists/${id}`);
        if (res) {
          notifySuccess(t("toast.success.watchlist.delete"));
          setShowModal(false);
          navigate("/watchlist");
        }
      } catch (err) {
        if (err.request?.status !== 403) {
          notifyError(t("toast.error"));
        }
      }
    }
  };

  return (
    <section
      ref={elRef}
      className="relative z-20 flex h-full w-full flex-col items-center justify-center rounded-sm bg-theme-light-bg-opacity px-8 py-12 text-theme-light-text-primary md:h-fit md:w-fit lg:px-32 lg:py-20 lg:shadow-lg dark:bg-theme-dark-bg-secondary dark:text-theme-dark-text-primary lg:dark:shadow-none"
    >
      <h1 className="pb-2 text-center font-abri text-3xl">
        {t("modal.watchlist.delete.title")}
      </h1>
      <h2 className="pb-6 text-center text-sm dark:text-theme-dark-text-secondary">
        {t("modal.watchlist.delete.subtitle")}
      </h2>
      <div className="flex h-fit w-full items-center justify-center gap-2">
        <SubmitBtn
          onClick={deleteWatchlist}
          activeColor={
            "border-theme-light-secondary text-theme-light-secondary whitespace-nowrap hover:bg-theme-light-bg-secondary dark:border-theme-dark-secondary dark:text-theme-dark-secondary dark:hover:bg-theme-dark-bg-third"
          }
        >
          {t("modal.watchlist.delete.submit").toUpperCase()}
        </SubmitBtn>
        <SubmitBtn
          onClick={() => setShowModal(false)}
          activeColor={
            "border-theme-light-text-primary dark:border-theme-dark-text-primary hover:border-theme-light-main hover:text-theme-light-main hover:bg-theme-light-bg-main dark:hover:border-theme-dark-main dark:hover:text-theme-dark-main dark:hover:bg-theme-dark-bg-third"
          }
        >
          {t("modal.watchlist.delete.cancel").toUpperCase()}
        </SubmitBtn>
      </div>
    </section>
  );
}

DeleteWatchlist.propTypes = {
  elRef: PropTypes.shape(),
  setShowModal: PropTypes.func,
};
