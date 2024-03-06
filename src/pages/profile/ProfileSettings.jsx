import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import DeleteAccount from "./components/action/DeleteAccount";
import UserContext from "../../contexts/UserContext";
import { notifyError } from "../../components/toasts/Toast";
import { instanceAPI } from "../../services/instances";
import ProfileBanner from "./components/ProfileBanner";
import Loader from "../../components/Loader";
import DeleteBanner from "./components/action/DeleteBanner";
import ProfileUpdate from "./components/ProfileUpdate";

export default function ProfileSettings() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteBanner, setShowDeleteBanner] = useState(false);
  const [bannerUpdated, setBannerUpdated] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (user.id) {
      setLoading(true);
      instanceAPI
        .get(`/api/v1/users/${user.id}`)
        .then((res) => {
          setUserData(res.data);
          setBannerUpdated(false);
          setLoading(false);
        })
        .catch((err) => {
          if (err.request?.status !== 403) {
            notifyError(t("toast.error"));
          }
        });
    }
  }, [user.id, bannerUpdated, t]);

  return (
    <main className="relative flex min-h-screen justify-between bg-theme-light-bg-primary pt-12 font-fira 2xl:mx-auto 3xl:w-1/2 dark:bg-theme-dark-bg-primary dark:text-theme-dark-text-primary">
      {loading && (
        <div className="m-auto">
          <Loader />
        </div>
      )}
      {!loading && userData && (
        <div className="w-full lg:mx-auto lg:w-3/5 lg:pt-6">
          <ProfileBanner
            src={userData?.profileBanner}
            setBannerUpdated={setBannerUpdated}
            setShowDeleteBanner={setShowDeleteBanner}
          />
          <section className="mx-5 flex flex-col gap-2 border-b-[1px] border-theme-light-bg-third pt-3 lg:gap-4 lg:pt-6 dark:border-theme-dark-bg-third">
            <h1 className="font-abri text-2xl lg:text-4xl">
              {t("page.profile.settings.title")}
            </h1>
            <p className="mb-2 text-justify indent-4 text-xs leading-5 lg:mb-6 lg:text-sm dark:text-theme-dark-text-secondary">
              {t("page.profile.settings.description")}
            </p>
          </section>
          <ProfileUpdate />
          <section className="mx-5 flex flex-col gap-2 pb-3 pt-2 lg:gap-4 lg:py-4">
            <h1 className="font-abri text-lg text-theme-light-secondary lg:px-0 lg:text-2xl dark:text-theme-dark-secondary">
              {t("page.profile.settings.delete.title")}
            </h1>
            <p className="mb-2 text-justify indent-4 text-xs leading-5 lg:text-sm dark:text-theme-dark-text-secondary">
              {t("page.profile.settings.delete.description")}
            </p>
            <div className="mx-auto mb-2 lg:mb-4">
              <Button
                onClick={() => setShowDeleteAccount(true)}
                activeColor="hover:border-theme-dark-secondary hover:text-theme-light-secondary dark:hover:border-theme-dark-secondary dark:hover:text-theme-dark-secondary active:border-theme-dark-secondary active:text-theme-dark-secondary"
              >
                {t("button.profile.delete")}
              </Button>
            </div>
          </section>
        </div>
      )}
      {showDeleteBanner && (
        <Modal
          showModal={showDeleteBanner}
          setShowModal={setShowDeleteBanner}
          setUpdated={setBannerUpdated}
          src={userData.profileBanner}
        >
          <DeleteBanner />
        </Modal>
      )}
      {showDeleteAccount && (
        <Modal
          email={userData.email}
          showModal={showDeleteAccount}
          setShowModal={setShowDeleteAccount}
        >
          <DeleteAccount />
        </Modal>
      )}
    </main>
  );
}
