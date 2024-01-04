import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchSchema } from "../../../services/validators";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

export default function ModalSearch({ setShowSearch, setShowBurger }) {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const closeModal = (e) => {
    const target = e.target;
    //--- Check which element being clicked on ---//
    if (target.matches("button") && !formRef.current?.contains(target)) {
      setShowSearch(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      query: "",
    },

    validationSchema: searchSchema,

    onSubmit: (values) => {
      navigate(`/search?query=${values.query.replace(/ /g, "+")}&page=1`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setShowSearch(false);
      setShowBurger(false);
    },
  });

  return (
    <div className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-theme-dark-bg-blury text-theme-light-text-secondary filter backdrop-blur-sm dark:text-theme-dark-text-primary">
      <button
        type="button"
        onClick={closeModal}
        className="absolute left-0 top-0 z-20 h-full w-full"
      />
      <form
        action="search"
        className="relative z-30 flex w-5/6 flex-col items-center gap-3 2xl:mx-auto 2xl:w-1/2"
        ref={formRef}
        onSubmit={formik.handleSubmit}
      >
        <label
          htmlFor="title"
          className="self-start text-xs font-bold lg:text-lg"
        >
          {t("modal.search.title")}{" "}
          {formik.errors.query && (
            <span className="font-light text-toast-light-error dark:text-toast-dark-error">
              *
            </span>
          )}
        </label>
        <input
          type="text"
          name="query"
          id="query"
          placeholder={t("modal.search.placeholder")}
          className="w-full rounded-lg p-4 text-sm font-semibold text-theme-light-text-primary placeholder:font-normal placeholder:italic focus:outline focus:outline-[2.5px] focus:outline-theme-light-main dark:bg-theme-dark-bg-secondary dark:text-theme-dark-text-primary dark:focus:outline-theme-dark-main"
          value={formik.values.query}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <section className="flex w-full flex-row-reverse justify-between">
          <button
            type="submit"
            disabled={!searchSchema.isValidSync(formik.values)}
            onSubmit={() => formik.handleSubmit}
            className="cursor-pointer self-end rounded-md border-[1px] border-theme-light-main bg-theme-light-main px-4 py-2 text-sm font-semibold mix-blend-screen transition-all disabled:cursor-default disabled:border-theme-light-bg-primary disabled:bg-transparent disabled:text-theme-light-bg-primary dark:border-theme-dark-main dark:bg-theme-dark-main dark:text-theme-dark-text-primary dark:disabled:border-theme-dark-text-primary dark:disabled:bg-transparent dark:disabled:text-theme-dark-text-primary"
          >
            {t("modal.search.submit").toUpperCase()}
          </button>
          {formik.errors.query && (
            <p className="text-xs text-toast-light-error dark:text-toast-dark-error">
              {formik.errors.query}
            </p>
          )}
        </section>
      </form>
    </div>
  );
}

ModalSearch.propTypes = {
  setShowSearch: PropTypes.func.isRequired,
  setShowBurger: PropTypes.func,
};
