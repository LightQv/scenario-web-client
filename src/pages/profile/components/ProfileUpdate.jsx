import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import UserContext from "../../../contexts/UserContext";
import { instanceAPI } from "../../../services/instances";
import { registerSchema } from "../../../services/validators";
import { notifyError, notifySuccess } from "../../../components/toasts/Toast";
import Button from "../../../components/Button";

export default function ProfileUpdate() {
  const { user, logout } = useContext(UserContext);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
      password: "",
      confirmPassword: "",
    },

    validationSchema: registerSchema,

    onSubmit: async (values) => {
      try {
        setLoading(true);
        const isUpdated = await instanceAPI.put(`/api/v1/user/${user.id}`, {
          username: values.username,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
        if (isUpdated) {
          logout();
          setLoading(false);
          notifySuccess(t("toast.success.profile.update"));
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
    <section className="mx-5 border-b-[1px] border-theme-light-bg-third py-2 lg:py-4 dark:border-theme-dark-bg-third">
      <h1 className="font-abri text-lg text-theme-light-text-primary lg:mb-4 lg:px-0 lg:text-2xl dark:text-theme-dark-text-primary">
        {t("page.profile.settings.subtitle")}
      </h1>
      <form
        action="update"
        className="grid grid-flow-row gap-2 md:grid-cols-2 lg:mx-16 lg:gap-4"
        onSubmit={formik.handleSubmit}
      >
        <section className="mb-2 mt-2 flex flex-col px-5 md:mt-0 lg:px-0">
          <label htmlFor="username" className="mb-1 font-abri text-base">
            {t("auth.form.label.username")}{" "}
            {formik.errors.username && (
              <span className="font-light text-toast-light-error dark:text-toast-dark-error">
                *
              </span>
            )}
          </label>
          <input
            type="text"
            name="username"
            className="border-b-[1px] border-theme-light-text-primary pb-1 focus:outline-none lg:w-full lg:text-base dark:border-theme-dark-text-primary dark:bg-theme-dark-bg-primary"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.username && (
            <p className="mt-1 text-xs text-toast-light-error dark:text-toast-dark-error">
              {formik.errors.username}
            </p>
          )}
        </section>
        <section className="mb-2 flex flex-col px-5 lg:px-0">
          <label htmlFor="email" className="mb-1 font-abri text-base">
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
            className="border-b-[1px] border-theme-light-text-primary pb-1 focus:outline-none lg:w-full lg:text-base dark:border-theme-dark-text-primary dark:bg-theme-dark-bg-primary"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && (
            <p className="mt-1 text-xs text-toast-light-error dark:text-toast-dark-error">
              {formik.errors.email}
            </p>
          )}
        </section>
        <section className="mb-2 flex flex-col px-5 lg:px-0">
          <label htmlFor="password" className="mb-1 font-abri text-base">
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
            className="border-b-[1px] border-theme-light-text-primary pb-1 focus:outline-none lg:w-full lg:text-base dark:border-theme-dark-text-primary dark:bg-theme-dark-bg-primary"
            value={formik.values.password}
            placeholder="**********"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && (
            <p className="mt-1 text-xs text-toast-light-error dark:text-toast-dark-error">
              {formik.errors.password}
            </p>
          )}
        </section>
        <section className="mb-1 flex flex-col px-5 lg:px-0">
          <label htmlFor="confirmPassword" className="mb-1 font-abri text-base">
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
            className="border-b-[1px] border-theme-light-text-primary pb-1 focus:outline-none lg:w-full lg:text-base dark:border-theme-dark-text-primary dark:bg-theme-dark-bg-primary"
            value={formik.values.confirmPassword}
            placeholder="**********"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.confirmPassword && (
            <p className="mt-1 text-xs text-toast-light-error dark:text-toast-dark-error">
              {formik.errors.confirmPassword}
            </p>
          )}
        </section>
        <section className="mx-auto my-2 w-fit md:col-span-2 md:mb-2 md:mt-0">
          <Button
            disabled={!registerSchema.isValidSync(formik.values) || loading}
            onSubmit={() => formik.handleSubmit}
            isLoading={loading}
            disableColor={`disabled:border-theme-light-bg-quad disabled:hover:bg-transparent disabled:text-theme-light-bg-quad dark:disabled:border-theme-dark-text-primary dark:disabled:text-theme-dark-text-primary`}
            activeColor="hover:border-theme-light-main hover:text-theme-light-main dark:hover:border-theme-dark-main dark:hover:text-theme-dark-main"
          >
            {t("button.profile.update")}
          </Button>
        </section>
      </form>
    </section>
  );
}
