import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { instanceAPI } from "../../../../services/instances";
import { notifyError } from "../../../../components/toasts/Toast";
import { updateWatchlistSchema } from "../../../../services/validators";
import PropTypes from "prop-types";
import SubmitBtn from "../../../../components/SubmitBtn";
import { useState } from "react";

export default function UpdateWatchlist({
  setShowModal,
  setUpdated,
  elRef,
  title,
}) {
  const { id } = useParams();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      newTitle: title,
    },

    validationSchema: updateWatchlistSchema,

    onSubmit: async (values) => {
      try {
        setLoading(true);
        const isModified = await instanceAPI.put(`/api/v1/watchlists/${id}`, {
          title: values.newTitle,
        });
        if (isModified) {
          setShowModal(false);
          setUpdated(true);
          setLoading(false);
        }
      } catch (err) {
        if (err) {
          notifyError(t("toast.error"));
        }
        setLoading(false);
      }
    },
  });

  return (
    <div className="relative z-20 flex h-full w-full flex-col items-center justify-center rounded-sm bg-theme-light-bg-opacity px-8 py-12 text-theme-light-text-primary md:h-fit md:w-fit lg:px-32 lg:py-20 lg:shadow-lg dark:bg-theme-dark-bg-secondary dark:text-theme-dark-text-primary lg:dark:shadow-none">
      <h1 className="pb-10 text-center font-abri text-3xl">
        {t("modal.watchlist.update.title")}
      </h1>
      <form
        action="edit"
        className="flex h-fit w-full flex-col items-center justify-center"
        ref={elRef}
        onSubmit={formik.handleSubmit}
      >
        <section className="mb-8 flex flex-col items-center gap-2 text-center">
          <label htmlFor="title" className="text-sm lg:text-base">
            {t("modal.watchlist.label")}{" "}
            {formik.errors.newTitle && (
              <span className="font-light text-toast-light-error dark:text-toast-dark-error">
                *
              </span>
            )}
          </label>
          <input
            type="text"
            name="newTitle"
            className="w-56 border-b-[1px] border-theme-light-text-primary pb-1 text-center focus:outline-none dark:border-theme-dark-text-primary dark:bg-theme-dark-bg-secondary"
            value={formik.values.newTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.newTitle && (
            <p className="text-xs text-toast-light-error dark:text-toast-dark-error">
              {formik.errors.newTitle}
            </p>
          )}
        </section>
        <section className="mt-4">
          <SubmitBtn
            disabled={
              ((formik.values.newTitle === title ||
                formik.values.newTitle === "") &&
                updateWatchlistSchema) ||
              loading
            }
            isLoading={loading}
            onSubmit={() => formik.handleSubmit}
            disableColor={
              "disabled:border-theme-dark-bg-primary disabled:hover:bg-transparent disabled:text-theme-dark-bg-primary dark:disabled:border-theme-dark-text-primary dark:disabled:text-theme-dark-text-primary"
            }
            activeColor={
              "border-theme-light-main text-theme-light-main hover:bg-theme-light-bg-secondary dark:border-theme-dark-main dark:text-theme-dark-main dark:hover:bg-theme-dark-bg-third"
            }
          >
            {t("modal.watchlist.update.submit")}
          </SubmitBtn>
        </section>
      </form>
    </div>
  );
}

UpdateWatchlist.propTypes = {
  setShowModal: PropTypes.func,
  setUpdated: PropTypes.func,
  elRef: PropTypes.shape(),
  title: PropTypes.string,
};
