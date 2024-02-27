import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { registerSchema } from "../../services/validators";
import { instanceAPI } from "../../services/instances";
import { notifyDuplicate, notifyError } from "../../components/toasts/Toast";
import PropTypes from "prop-types";
import SubmitBtn from "../SubmitBtn";
import { useState } from "react";

export default function RegisterForm({ setForm, formRef }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: registerSchema,

    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await instanceAPI.post("/api/v1/auth/register", values);
        if (res) {
          setForm({ login: true, register: false, reset: false });
          setLoading(false);
        } else throw new Error();
      } catch (err) {
        if (err.request.status === 400) {
          notifyDuplicate(t("toast.register"));
        }
        if (err.request.status === 500) {
          notifyError(t("toast.error"));
        }
      }
      setLoading(false);
    },
  });

  return (
    <div className="relative z-20 flex h-full w-full flex-col items-center justify-center rounded-sm bg-theme-light-bg-opacity px-8 py-12 text-theme-light-text-primary md:h-fit md:w-fit lg:px-32 lg:py-20 lg:shadow-lg dark:bg-theme-dark-bg-secondary dark:text-theme-dark-text-primary lg:dark:shadow-none">
      <h1 className="pb-10 font-abri text-3xl">
        {t("auth.form.title.register")}
      </h1>
      <form
        action="register"
        className="flex h-fit w-full flex-col items-center justify-center"
        ref={formRef}
        onSubmit={formik.handleSubmit}
      >
        <section className="mb-8 flex flex-col gap-2 text-center">
          <label htmlFor="username" className="text-sm lg:text-base">
            {t("auth.form.label.username")}{" "}
            {formik.errors.username && (
              <span className="font-light text-toast-light-error dark:text-toast-dark-error">
                *
              </span>
            )}
          </label>
          <input
            type="username"
            name="username"
            className="w-56 border-b-[1px] border-theme-light-text-primary pb-1 text-center focus:outline-none dark:border-theme-dark-text-primary dark:bg-theme-dark-bg-secondary"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.username && (
            <p className="text-xs text-toast-light-error dark:text-toast-dark-error">
              {formik.errors.username}
            </p>
          )}
        </section>
        <section className="mb-8 flex flex-col gap-2 text-center">
          <label htmlFor="email" className="text-sm lg:text-base">
            {t("auth.form.label.email")}{" "}
            {formik.errors.email && (
              <span className="font-light text-toast-light-error dark:text-toast-dark-error">
                *
              </span>
            )}
          </label>
          <input
            type="email"
            name="email"
            className="w-56 border-b-[1px] border-theme-light-text-primary pb-1 text-center focus:outline-none dark:border-theme-dark-text-primary dark:bg-theme-dark-bg-secondary"
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
        <section className="mb-8 flex flex-col gap-2 text-center">
          <label htmlFor="password" className="text-sm lg:text-base">
            {t("auth.form.label.password")}{" "}
            {formik.errors.password && (
              <span className="font-light text-toast-light-error dark:text-toast-dark-error">
                *
              </span>
            )}
          </label>
          <input
            type="password"
            name="password"
            className="w-56 border-b-[1px] border-theme-light-text-primary pb-1 text-center focus:outline-none dark:border-theme-dark-text-primary dark:bg-theme-dark-bg-secondary"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && (
            <p className="text-xs text-toast-light-error dark:text-toast-dark-error">
              {formik.errors.password}
            </p>
          )}
        </section>
        <section className="mb-4 flex flex-col gap-2 text-center">
          <label htmlFor="confirmPassword" className="text-sm lg:text-base">
            {t("auth.form.label.confirmPassword")}{" "}
            {formik.errors.confirmPassword && (
              <span className="font-light text-toast-light-error dark:text-toast-dark-error">
                *
              </span>
            )}
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="w-56 border-b-[1px] border-theme-light-text-primary pb-1 text-center focus:outline-none dark:border-theme-dark-text-primary dark:bg-theme-dark-bg-secondary"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.confirmPassword && (
            <p className="text-xs text-toast-light-error dark:text-toast-dark-error">
              {formik.errors.confirmPassword}
            </p>
          )}
        </section>
        <section className="mt-8">
          <SubmitBtn
            disabled={!registerSchema.isValidSync(formik.values) || loading}
            onSubmit={() => formik.handleSubmit}
            isLoading={loading}
            disableColor={
              "disabled:border-theme-dark-bg-primary disabled:hover:bg-transparent disabled:text-theme-dark-bg-primary dark:disabled:border-theme-dark-text-primary dark:disabled:text-theme-dark-text-primary"
            }
            activeColor={
              "border-theme-light-main text-theme-light-main hover:bg-theme-light-bg-secondary dark:border-theme-dark-main dark:text-theme-dark-main dark:hover:bg-theme-dark-bg-third"
            }
          >
            {t("auth.form.submit.register")}
          </SubmitBtn>
        </section>
      </form>
      <section className="mt-6 text-center text-xs lg:text-sm dark:text-theme-dark-bg-quad">
        <p>{t("auth.form.switch.register.number1")}</p>
        <button
          type="button"
          className="font-bold underline underline-offset-4 transition-all hover:text-theme-light-main lg:text-sm dark:hover:text-theme-dark-main"
          onClick={() =>
            setForm({ login: true, register: false, reset: false })
          }
        >
          {t("auth.form.switch.register.number2")}
        </button>
      </section>
    </div>
  );
}

RegisterForm.propTypes = {
  setShowAuth: PropTypes.func,
  setForm: PropTypes.func.isRequired,
  formRef: PropTypes.shape().isRequired,
};
