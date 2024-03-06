import { deleteObject, ref } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import storage from "../../../../services/firebase";
import { instanceAPI } from "../../../../services/instances";
import UserContext from "../../../../contexts/UserContext";
import { notifyError } from "../../../../components/toasts/Toast";
import PropTypes from "prop-types";
import SubmitBtn from "../../../../components/SubmitBtn";

export default function DeleteBanner({ elRef, setShowModal, setUpdated, src }) {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [deleted, setDeleted] = useState(false);

  //--- Delete Banner on Firebase ---//
  const deleteBanner = () => {
    if (src) {
      const oldBannerRef = ref(storage, src);
      deleteObject(oldBannerRef);
      setDeleted(true);
    }
  };

  //--- Delete Banner URL on API ---//
  useEffect(() => {
    const bannerLink = null;
    if (deleted) {
      instanceAPI
        .put(`/api/v1/users/banner/${user.id}`, { bannerLink })
        .then(() => {
          setShowModal(false);
          setUpdated(true);
        })
        .catch(() => notifyError(t("toast.error")));
    }
  }, [deleted, t, user.id, setUpdated, setShowModal]);

  return (
    <section
      ref={elRef}
      className="relative z-20 flex h-full w-full flex-col items-center justify-center rounded-sm bg-theme-light-bg-opacity px-8 py-12 text-theme-light-text-primary md:h-fit md:w-fit lg:px-32 lg:py-20 lg:shadow-lg dark:bg-theme-dark-bg-secondary dark:text-theme-dark-text-primary lg:dark:shadow-none"
    >
      <h1 className="pb-2 text-center font-abri text-3xl">
        {t("modal.profile.banner.title")}
      </h1>
      <h2 className="pb-6 text-center text-sm dark:text-theme-dark-text-secondary">
        {t("modal.profile.banner.subtitle")}
      </h2>
      <div className="flex h-fit w-full items-center justify-center gap-2">
        <SubmitBtn
          onClick={deleteBanner}
          activeColor={
            "border-theme-light-secondary text-theme-light-secondary hover:bg-theme-light-bg-secondary dark:border-theme-dark-secondary dark:text-theme-dark-secondary dark:hover:bg-theme-dark-bg-third"
          }
        >
          {t("modal.profile.banner.submit").toUpperCase()}
        </SubmitBtn>
        <SubmitBtn
          onClick={() => setShowModal(false)}
          activeColor={
            "border-theme-light-text-primary dark:border-theme-dark-text-primary hover:border-theme-light-main hover:text-theme-light-main hover:bg-theme-light-bg-main dark:hover:border-theme-dark-main dark:hover:text-theme-dark-main dark:hover:bg-theme-dark-bg-third"
          }
        >
          {t("modal.profile.banner.cancel").toUpperCase()}
        </SubmitBtn>
      </div>
    </section>
  );
}

DeleteBanner.propTypes = {
  elRef: PropTypes.shape(),
  setShowModal: PropTypes.func,
  setUpdated: PropTypes.func,
  src: PropTypes.string,
};
