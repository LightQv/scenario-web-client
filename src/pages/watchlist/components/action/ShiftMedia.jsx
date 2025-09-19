import { useTranslation } from "react-i18next";
import { instanceAPI } from "../../../../services/instances";
import {
  notifyError,
  notifySuccess,
} from "../../../../components/toasts/Toast";
import SubmitBtn from "../../../../components/ui/SubmitBtn";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../../contexts/UserContext";
import { useFormik } from "formik";
import { createMediaSchema } from "../../../../services/validators";

export default function ShiftMedia({ elRef, setShowModal, setUpdated, data }) {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [watchlists, setWatchlists] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.id) {
      instanceAPI
        .get(`/api/v1/watchlists/${user.id}`)
        .then((res) => {
          setWatchlists(res.data);
        })
        .catch((err) => {
          if (err.response?.status !== 403) {
            notifyError(t("toast.error"));
          }
        });
    }
  }, [user.id, t]);

  const formik = useFormik({
    initialValues: {
      watchlistId: "",
    },

    validationSchema: createMediaSchema,

    onSubmit: async (values) => {
      const [watchlistSelected] = watchlists.filter(
        (el) => el.id === values.watchlistId
      );

      if (data) {
        try {
          setLoading(true);
          const isEdited = await instanceAPI.put(`/api/v1/medias/${data.id}`, {
            watchlist_id: values.watchlistId,
          });
          if (isEdited) {
            setUpdated(true);
            setShowModal(false);
            setLoading(false);
            notifySuccess(
              t("toast.success.media.add") + ` "${watchlistSelected.title}"`
            );
          }
        } catch (err) {
          if (err.request?.status !== 403) {
            notifyError(t("toast.error"));
          }
          setLoading(true);
        }
      }
    },
  });

  return (
    <div className="relative z-20 flex h-full w-full flex-col items-center justify-center rounded-sm bg-theme-light-bg-opacity px-8 py-12 text-theme-light-text-primary md:h-fit md:w-fit lg:px-32 lg:py-20 lg:shadow-lg dark:bg-theme-dark-bg-primary dark:text-theme-dark-text-primary lg:dark:shadow-none">
      <h1 className="pb-10 text-center font-abri text-3xl">
        {t("modal.media.create.title")}
      </h1>
      <form
        action="update"
        className="flex h-fit w-full flex-col items-center justify-center"
        ref={elRef}
        onSubmit={formik.handleSubmit}
      >
        <section className="mb-8 flex flex-col items-center gap-2 text-center">
          <label htmlFor="watchlist" className="text-sm lg:text-base">
            {t("modal.media.create.label")}{" "}
            {formik.errors.watchlistId && (
              <span className="font-light text-toast-light-error dark:text-toast-dark-error">
                *
              </span>
            )}
          </label>
          <select
            type="text"
            name="watchlistId"
            className="w-56 rounded-md border-[1px] border-theme-light-text-primary bg-transparent px-4 py-2 focus:outline-none dark:border-theme-dark-text-primary dark:bg-theme-dark-bg-primary"
            value={formik.values.watchlistId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">{t("modal.media.create.default")}</option>
            {watchlists &&
              watchlists
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.title}
                  </option>
                ))}
          </select>
          {formik.errors.watchlistId && (
            <p className="text-xs text-toast-light-error dark:text-toast-dark-error">
              {formik.errors.watchlistId}
            </p>
          )}
        </section>
        <section className="mt-4">
          <SubmitBtn
            onSubmit={() => formik.handleSubmit}
            disabled={
              (!createMediaSchema.isValidSync(formik.values) &&
                formik.values !== null) ||
              loading
            }
            isLoading={loading}
            disableColor={
              "disabled:border-theme-dark-bg-primary disabled:hover:bg-transparent disabled:text-theme-dark-bg-primary dark:disabled:border-theme-dark-text-primary dark:disabled:text-theme-dark-text-primary"
            }
            activeColor={
              "border-theme-light-main text-theme-light-main hover:bg-theme-light-bg-secondary dark:border-theme-dark-main dark:text-theme-dark-main dark:hover:bg-theme-dark-bg-third"
            }
          >
            {t("modal.media.create.submit")}
          </SubmitBtn>
        </section>
      </form>
    </div>
  );
}

ShiftMedia.propTypes = {
  setShowModal: PropTypes.func,
  setUpdated: PropTypes.func,
  elRef: PropTypes.shape(),
  data: PropTypes.shape(),
};
