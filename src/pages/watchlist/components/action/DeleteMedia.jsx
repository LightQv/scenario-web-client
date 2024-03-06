import { useTranslation } from "react-i18next";
import { instanceAPI } from "../../../../services/instances";
import { notifyError } from "../../../../components/toasts/Toast";
import SubmitBtn from "../../../../components/SubmitBtn";
import PropTypes from "prop-types";
import { useState } from "react";

export default function DeleteMedia({
  elRef,
  setShowModal,
  setUpdated,
  dataId,
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const deleteMedia = async () => {
    if (dataId) {
      try {
        setLoading(true);
        const res = await instanceAPI.delete(`/api/v1/medias/${dataId}`);
        if (res) {
          setUpdated(true);
          setShowModal(false);
          setLoading(false);
        }
      } catch (err) {
        if (err.request?.status !== 403) {
          notifyError(t("toast.error"));
        }
        setLoading(true);
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
          onClick={deleteMedia}
          isLoading={loading}
          disabled={loading}
          disableColor={
            "disabled:border-theme-dark-bg-primary disabled:hover:bg-transparent disabled:text-theme-dark-bg-primary dark:disabled:border-theme-dark-text-primary dark:disabled:text-theme-dark-text-primary"
          }
          activeColor={
            "border-theme-light-secondary text-theme-light-secondary whitespace-nowrap hover:bg-theme-light-bg-secondary dark:border-theme-dark-secondary dark:text-theme-dark-secondary dark:hover:bg-theme-dark-bg-third"
          }
        >
          {t("modal.media.delete.submit")}
        </SubmitBtn>
        <SubmitBtn
          onClick={() => setShowModal(false)}
          activeColor={
            "border-theme-light-text-primary dark:border-theme-dark-text-primary hover:border-theme-light-main hover:text-theme-light-main hover:bg-theme-light-bg-main dark:hover:border-theme-dark-main dark:hover:text-theme-dark-main dark:hover:bg-theme-dark-bg-third"
          }
        >
          {t("modal.watchlist.delete.cancel")}
        </SubmitBtn>
      </div>
    </section>
  );
}

DeleteMedia.propTypes = {
  setShowModal: PropTypes.func,
  setUpdated: PropTypes.func,
  elRef: PropTypes.shape(),
  dataId: PropTypes.string,
};
