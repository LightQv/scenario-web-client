import { useContext } from "react";
import UserContext from "../../../../contexts/UserContext";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { instanceAPI } from "../../../../services/instances";
import { notifyError } from "../../../../components/toasts/Toast";
import { createWatchlistSchema } from "../../../../services/validators";
import PropTypes from "prop-types";
import SubmitBtn from "../../../../components/SubmitBtn";

export default function CreateWatchlist({ setShowModal, setUpdated, elRef }) {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      title: "",
    },

    validationSchema: createWatchlistSchema,

    onSubmit: async (values) => {
      try {
        const isCreated = await instanceAPI.post(`/api/v1/watchlist`, {
          title: values.title,
          authorId: user.id,
        });
        if (isCreated) {
          setShowModal(false);
          setUpdated(true);
        }
      } catch (err) {
        if (err) {
          notifyError(t("toast.error"));
        }
      }
    },
  });

  return (
    <div className="relative z-20 flex h-full w-full flex-col items-center justify-center rounded-sm bg-theme-light-bg-opacity px-8 py-12 text-theme-light-text-primary md:h-fit md:w-fit lg:px-32 lg:py-20 lg:shadow-lg dark:bg-theme-dark-bg-secondary dark:text-theme-dark-text-primary lg:dark:shadow-none">
      <h1 className="pb-10 font-abri text-3xl">
        {t("modal.watchlist.create.title")}
      </h1>
      <form
        action="create"
        className="flex h-fit w-full flex-col items-center justify-center"
        ref={elRef}
        onSubmit={formik.handleSubmit}
      >
        <section className="mb-8 flex flex-col items-center gap-2 text-center">
          <label htmlFor="title" className="text-sm lg:text-base">
            {t("modal.watchlist.label")}{" "}
            {formik.errors.title && (
              <span className="font-light text-toast-light-error dark:text-toast-dark-error">
                *
              </span>
            )}
          </label>
          <input
            type="text"
            name="title"
            className="w-56 border-b-[1px] border-theme-light-text-primary pb-1 text-center focus:outline-none dark:border-theme-dark-text-primary dark:bg-theme-dark-bg-secondary"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.title && (
            <p className="text-xs text-toast-light-error dark:text-toast-dark-error">
              {formik.errors.title}
            </p>
          )}
        </section>
        <section className="mt-4">
          <SubmitBtn
            disabled={!createWatchlistSchema.isValidSync(formik.values)}
            onSubmit={() => formik.handleSubmit}
            disableColor={
              "disabled:border-theme-dark-bg-primary disabled:hover:bg-transparent disabled:text-theme-dark-bg-primary dark:disabled:border-theme-dark-text-primary dark:disabled:text-theme-dark-text-primary"
            }
            activeColor={
              "border-theme-light-main text-theme-light-main hover:bg-theme-light-bg-secondary dark:border-theme-dark-main dark:text-theme-dark-main dark:hover:bg-theme-dark-bg-third"
            }
          >
            {t("modal.watchlist.create.submit").toUpperCase()}
          </SubmitBtn>
        </section>
      </form>
    </div>
  );
}

CreateWatchlist.propTypes = {
  setShowModal: PropTypes.func,
  setUpdated: PropTypes.func,
  elRef: PropTypes.shape(),
};
