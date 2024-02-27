import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { resetSchema } from "../services/validators";
import { instanceAPI } from "../services/instances";
import { notifyError, notifySuccess } from "../components/toasts/Toast";
import { useState } from "react";
import ButtonLoader from "../components/ButtonLoader";

export default function ResetPw() {
  const { t } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      passwordToken: token,
    },

    validationSchema: resetSchema,

    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await instanceAPI.post(
          "/api/v1/auth/reset-password",
          values
        );
        if (res) {
          setLoading(false);
          notifySuccess(t("toast.success.reset"));
          navigate("/");
        } else throw new Error();
      } catch (err) {
        if (err.request?.status === 500) {
          notifyError(t("toast.error"));
        }
        setLoading(false);
      }
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-theme-light-bg-primary pt-12 font-fira 2xl:mx-auto 3xl:w-1/2 dark:bg-theme-dark-bg-primary dark:text-theme-dark-text-primary ">
      <div className="flex h-fit w-fit flex-col items-center justify-center rounded-sm bg-theme-light-bg-primary px-8 py-12 text-theme-light-text-primary lg:px-32 lg:py-20 lg:shadow-lg dark:bg-theme-dark-bg-secondary dark:text-theme-dark-text-primary lg:dark:shadow-none">
        <h1 className="pb-10 text-center font-abri text-3xl">
          {t("auth.form.title.reset")}
        </h1>
        <form
          action="reset"
          className="flex h-full w-full flex-col items-center"
          onSubmit={formik.handleSubmit}
        >
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
              className="w-56 border-b-[1px] border-theme-light-text-primary text-center focus:outline-none dark:border-theme-dark-text-primary dark:bg-theme-dark-bg-secondary"
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
            <label htmlFor="password" className="text-sm lg:text-base">
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
              className="w-56 border-b-[1px] border-theme-light-text-primary text-center focus:outline-none dark:border-theme-dark-text-primary dark:bg-theme-dark-bg-secondary"
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
          <button
            type="submit"
            disabled={!resetSchema.isValidSync(formik.values) || loading}
            onSubmit={() => formik.handleSubmit}
            className="mt-8 w-fit cursor-pointer rounded-md border-[1px] border-theme-light-secondary bg-theme-light-secondary px-4 py-2 text-sm font-semibold uppercase text-theme-light-text-secondary transition-all hover:bg-theme-dark-secondary disabled:cursor-default disabled:border-theme-dark-bg-primary disabled:bg-transparent disabled:text-theme-dark-bg-primary dark:border-theme-dark-secondary dark:bg-theme-dark-secondary dark:text-theme-dark-text-primary dark:hover:bg-theme-light-secondary dark:disabled:border-theme-dark-text-primary dark:disabled:bg-transparent dark:disabled:text-theme-dark-text-primary"
          >
            {loading ? <ButtonLoader /> : t("auth.form.submit.reset")}
          </button>
        </form>
      </div>
    </main>
  );
}
