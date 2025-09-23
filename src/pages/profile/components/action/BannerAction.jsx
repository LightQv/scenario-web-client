import { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import UserContext from "../../../../contexts/UserContext";
import { useTranslation } from "react-i18next";
import { instanceAPI } from "../../../../services/instances";
import { notifyPromise } from "../../../../components/toasts/Toast";
import PropTypes from "prop-types";

export default function BannerAction({
  poster,
  setShowModalDelete,
  setUpdated,
}) {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [newBanner, setNewBanner] = useState(null);

  //--- Put File in newBanner state using dropzone ---//
  const handleDrop = useCallback((acceptedFiles) => {
    setNewBanner(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 1,
    onDrop: handleDrop,
  });

  //--- Local API Upload Logic ---//
  useEffect(() => {
    const handleBannerUpload = async () => {
      if (newBanner && newBanner.size > 5000000) {
        setNewBanner(null);
        throw new Error("toast.errorFileSize");
      }
      if (newBanner === null) return;

      try {
        const formData = new FormData();
        formData.append("file", newBanner);

        const response = await instanceAPI.post(
          `/api/v1/uploads/banner/${user.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          setUpdated(true);
          setNewBanner(null);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
          throw new Error("toast.error");
        }
      } catch (error) {
        setNewBanner(null);
        if (error.response?.status === 400) {
          throw new Error(error.response.data.detail || t("toast.error"));
        } else if (error.response?.status === 413) {
          throw new Error("toast.errorFileSize");
        } else if (error.response?.status === 415) {
          throw new Error("toast.errorFileFormat");
        } else {
          throw new Error("toast.error");
        }
      }
    };

    // Call the entire script
    if (newBanner) {
      notifyPromise(handleBannerUpload(), {
        loading: t("toast.loading.bannerUpload"),
        success: t("toast.success.bannerUpload"),
        error: (error) => t(error || "toast.error"),
      });
    }
  }, [newBanner, user.id, t, setUpdated]);

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
