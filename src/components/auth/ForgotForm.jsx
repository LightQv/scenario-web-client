import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { forgottenSchema } from "../../services/validators";
import { instanceAPI } from "../../services/instances";
import { notifyError, notifySuccess } from "../toasts/Toast";
import PropTypes from "prop-types";
import SubmitBtn from "../SubmitBtn";

export default function ForgotForm({ setForm, formRef }) {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: forgottenSchema,

    onSubmit: async (values) => {
      try {
        const res = await instanceAPI.post(
          "/api/v1/auth/forgotten-password",
          values
        );
        if (res) {
          notifySuccess(t("toast.success.forgot"));
        } else throw new Error();
      } catch (err) {
        if (err.request?.status === 500) {
          notifyError(t("toast.error"));
        }
      }
    },
  });

  return (
    <div className="relative z-20 flex h-full w-full flex-col items-center justify-center rounded-sm bg-theme-light-bg-opacity px-8 py-12 text-theme-light-text-primary md:h-fit md:w-fit lg:px-32 lg:py-20 lg:shadow-lg dark:bg-theme-dark-bg-secondary dark:text-theme-dark-text-primary lg:dark:shadow-none">
      <h1 className="pb-2 text-center font-abri text-3xl">
        {t("auth.form.title.forgot.title")}
      </h1>
      <h2 className="pb-10 text-center text-sm">
        {t("auth.form.title.forgot.subtitle")}
      </h2>
      <form
        action="forgot"
        className="flex h-fit w-full flex-col items-center justify-center lg:w-1/3"
        ref={formRef}
        onSubmit={formik.handleSubmit}
      >
        <section className="mb-4 flex flex-col gap-2 text-center">
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
        <section className="mt-8">
          <SubmitBtn
            disabled={!forgottenSchema.isValidSync(formik.values)}
            onSubmit={() => formik.handleSubmit}
            disableColor={
              "disabled:border-theme-dark-bg-primary disabled:hover:bg-transparent disabled:text-theme-dark-bg-primary dark:disabled:border-theme-dark-text-primary dark:disabled:text-theme-dark-text-primary"
            }
            activeColor={
              "border-theme-light-main text-theme-light-main hover:bg-theme-light-bg-secondary dark:border-theme-dark-main dark:text-theme-dark-main dark:hover:bg-theme-dark-bg-third"
            }
          >
            {t("auth.form.submit.forgot").toUpperCase()}
          </SubmitBtn>
        </section>
      </form>
      <section className="mt-6 text-center text-xs lg:text-sm dark:text-theme-dark-bg-quad">
        <p>{t("auth.form.switch.forgot.number1")}</p>
        <button
          type="button"
          className="font-bold underline underline-offset-4 transition-all hover:text-theme-light-main lg:text-sm dark:hover:text-theme-dark-main"
          onClick={() =>
            setForm({ login: true, register: false, reset: false })
          }
        >
          {t("auth.form.switch.forgot.number2")}
        </button>
      </section>
    </div>
  );
}

ForgotForm.propTypes = {
  setForm: PropTypes.func.isRequired,
  formRef: PropTypes.shape().isRequired,
};
