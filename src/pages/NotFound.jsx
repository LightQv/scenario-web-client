import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="relative flex min-h-screen justify-between bg-theme-light-bg-primary pt-12 font-fira 2xl:mx-auto 3xl:w-1/2 dark:bg-theme-dark-bg-primary dark:text-theme-dark-text-primary">
      <div className="w-full lg:mx-auto lg:w-[55%] lg:pt-8">
        <section className="w-full">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG5zNmtiNTR0ZWFmeTFzNjBlbDVueGM1Z3A1azlndGxndjdzcDF3byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g01ZnwAUvutuK8GIQn/giphy.gif"
            alt="not-found"
            className="w-full border-[1px] border-theme-light-bg-third object-cover dark:border-theme-dark-bg-third"
          />
        </section>
        <section className="mx-5 flex flex-col gap-2 border-b-[1px] border-theme-light-bg-third pt-3 lg:gap-4 lg:pt-6 dark:border-theme-dark-bg-third">
          <h1 className="w-3/4 font-abri text-2xl lg:text-4xl">
            {t("error.notFound.title")}
          </h1>
          <p className="mb-2 text-justify indent-4 text-xs leading-5 lg:mb-6 lg:text-base dark:text-theme-dark-text-secondary">
            {t("error.notFound.subtitle")}
          </p>
        </section>
      </div>
    </main>
  );
}
