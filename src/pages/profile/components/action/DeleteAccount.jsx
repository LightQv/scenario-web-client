import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { instanceAPI } from "../../../../services/instances";
import {
  notifyError,
  notifySuccess,
} from "../../../../components/toasts/Toast";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../../../contexts/UserContext";
import * as Yup from "yup";
import PropTypes from "prop-types";
import SubmitBtn from "../../../../components/SubmitBtn";

export default function DeleteAccount({ email, setShowModal, elRef }) {
  const { user, logout } = useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const deleteSchema = Yup.object({
    email: Yup.string().matches(new RegExp(email + "/bye-scenario"), {
      message: t("validator.profile.delete"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: deleteSchema,

    onSubmit: async () => {
      try {
        setLoading(true);
        const res = await instanceAPI.delete(`/api/v1/users/${user.id}`);
        if (res) {
          logout();
          notifySuccess(t("toast.success.profile.delete"));
          setShowModal(false);
          setLoading(false);
          navigate("/");
        }
      } catch (err) {
        if (err.request?.status === 401 || err.request?.status === 403) {
          notifyError(t("toast.error"));
        }
        setLoading(false);
      }
    },
  });

  return (
    <div className="relative z-20 flex h-full w-full flex-col items-center justify-center rounded-sm bg-theme-light-bg-opacity px-8 py-12 text-theme-light-text-primary md:h-fit md:w-fit lg:px-32 lg:py-20 lg:shadow-lg dark:bg-theme-dark-bg-secondary dark:text-theme-dark-text-primary lg:dark:shadow-none">
      <h1 className="pb-10 font-abri text-3xl">
        {t("modal.profile.delete.title")}
      </h1>
      <form
        action="delete"
        className="flex h-fit w-full flex-col items-center justify-center"
        ref={elRef}
        onSubmit={formik.handleSubmit}
      >
        <section className="mb-8 flex flex-col items-center gap-2 text-center">
          <label htmlFor="email" className="text-sm lg:text-base">
            {t("modal.profile.delete.label1")}{" "}
            <span className="italic">{`${email}/bye-scenario`}</span>{" "}
            {t("modal.profile.delete.label2")}.{" "}
            {formik.errors.email && (
              <span className="font-light text-toast-light-error dark:text-toast-dark-error">
                *
              </span>
            )}
          </label>
          <input
            type="text"
            name="email"
            className="w-56 border-b-[1px] border-theme-light-text-primary text-center focus:outline-none dark:border-theme-dark-text-primary dark:bg-theme-dark-bg-secondary"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && (
            <p className="text-xs text-toast-light-error dark:text-toast-dark-error">
              {formik.errors.email}
            </p>
          )}
        </section>
        <section className="mt-8">
          <SubmitBtn
            disabled={!deleteSchema.isValidSync(formik.values) || loading}
            onSubmit={() => formik.handleSubmit}
            isLoading={loading}
            disableColor={
              "disabled:border-theme-dark-bg-primary disabled:hover:bg-transparent disabled:text-theme-dark-bg-primary dark:disabled:border-theme-dark-text-primary dark:disabled:text-theme-dark-text-primary"
            }
            activeColor={
              "border-theme-light-secondary text-theme-light-secondary hover:bg-theme-light-bg-secondary dark:border-theme-dark-secondary dark:text-theme-dark-secondary dark:hover:bg-theme-dark-bg-third"
            }
          >
            {t("modal.profile.delete.submit")}
          </SubmitBtn>
        </section>
        <section className="mt-6 text-center text-xs lg:text-sm dark:text-theme-dark-bg-quad">
          <p>{t("modal.profile.delete.subtitle")}</p>
        </section>
      </form>
    </div>
  );
}

DeleteAccount.propTypes = {
  email: PropTypes.string,
  setShowModal: PropTypes.func,
  elRef: PropTypes.shape(),
};
