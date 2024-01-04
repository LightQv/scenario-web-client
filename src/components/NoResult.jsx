import { useTranslation } from "react-i18next";

export default function NoResult() {
  const { t } = useTranslation();
  return (
    <div className="lg:w-2/3">
      <section className="w-full">
        <img
          src="https://media.giphy.com/media/d2YWTOsVtuHgOHhC/giphy.gif"
          alt="no-result"
          className="w-full border-[1px] border-theme-light-bg-third object-cover lg:h-[30rem] dark:border-theme-dark-bg-third"
        />
      </section>
      <section className="mx-5 flex flex-col gap-2 border-b-[1px] border-theme-light-bg-third pt-3 lg:gap-4 lg:pt-6 dark:border-theme-dark-bg-third">
        <h1 className="w-3/4 font-abri text-2xl lg:text-4xl">
          {t("error.noResult.title")}
        </h1>
        <p className="mb-2 text-justify indent-4 text-xs leading-5 lg:mb-6 lg:text-base dark:text-theme-dark-text-secondary">
          {t("error.noResult.subtitle")}
        </p>
      </section>
    </div>
  );
}
