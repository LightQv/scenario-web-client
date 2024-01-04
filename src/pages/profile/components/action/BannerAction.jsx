import { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import storage from "../../../../services/firebase";
import { v4 as uuid } from "uuid";
import UserContext from "../../../../contexts/UserContext";
import { useTranslation } from "react-i18next";
import { instanceAPI } from "../../../../services/instances";
import {
  notifyError,
  notifyPromise,
} from "../../../../components/toasts/Toast";
import PropTypes from "prop-types";

export default function BannerAction({
  poster,
  setShowModalDelete,
  setUpdated,
}) {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [newBanner, setNewBanner] = useState(null);
  const [bannerLink, setBannerLink] = useState(null);
  const [firebaseUpdated, setFirebaseUpdated] = useState(false);

  //--- Put File in newBanner state using dropzone ---//
  const handleDrop = useCallback((acceptedFiles) => {
    setNewBanner(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDrop: handleDrop,
  });

  //--- Firebase Upload Logic ---//
  useEffect(() => {
    const handleBannerUpload = async () => {
      // Won't accept Banner if over 5Mb
      if (newBanner && newBanner.size > 5000000) {
        notifyError(t("toast.errorSize"));
        setNewBanner(null);
        return;
      }
      // Won't accept Banner if null
      if (newBanner === null) return;

      // Delete old Banner on Firebase if exist
      if (poster && newBanner) {
        const oldBannerRef = ref(storage, poster);
        const isOldBanner = await getDownloadURL(oldBannerRef);
        if (isOldBanner) {
          deleteObject(oldBannerRef);
        }
      }

      // Upload new Banner on Firebase and get it's URL
      try {
        // Format new Banner name with uuid & username
        const bannerRef = ref(
          storage,
          `profile_banner/${uuid()}_${user.username.toLowerCase()}`
        );
        const uploadBanner = await uploadBytes(bannerRef, newBanner);
        if (uploadBanner) {
          const link = await getDownloadURL(uploadBanner.ref);
          if (link) {
            setBannerLink(link);
            setFirebaseUpdated(true);
            setNewBanner(null);
          } else throw new Error();
        } else throw new Error();
      } catch (err) {
        notifyError(t("toast.errorFirebase"));
      }
    };

    // Call the entire script
    if (newBanner) {
      notifyPromise(handleBannerUpload());
    }
  }, [newBanner, poster, user.username, t]);

  // Finally put the Banner's URL on the DB
  useEffect(() => {
    if (firebaseUpdated && bannerLink) {
      instanceAPI
        .put(`/api/v1/user/banner/${user.id}`, { bannerLink })
        .then(() => {
          setUpdated(true);
        })
        .catch(() => notifyError(t("toast.error")));
    }
  }, [firebaseUpdated, bannerLink, user.id, t, setUpdated]);

  return (
    <>
      <section
        className="h-fit w-full cursor-pointer px-4 py-2 text-end text-xs text-theme-light-text-primary hover:bg-theme-light-bg-third dark:text-theme-dark-text-primary dark:hover:bg-theme-dark-bg-third"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>{t("dropdown.banner.modify")}</p>
      </section>
      {poster && (
        <button
          type="button"
          onClick={() => setShowModalDelete(true)}
          className="h-fit w-full border-t-[1px] border-theme-light-bg-third px-4 py-2 text-end text-xs text-theme-light-secondary hover:bg-theme-light-bg-third dark:border-theme-dark-bg-third dark:text-theme-dark-secondary dark:hover:bg-theme-dark-bg-third"
        >
          {t("dropdown.banner.delete")}
        </button>
      )}
    </>
  );
}

BannerAction.propTypes = {
  poster: PropTypes.string,
  setShowModalDelete: PropTypes.func,
  setUpdated: PropTypes.func,
};
