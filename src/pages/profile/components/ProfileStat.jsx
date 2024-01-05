import { useTranslation } from "react-i18next";
import ViewPercentage from "./chart/ViewPercentage";
import DecadeCount from "./chart/DecadeCount";

export default function ProfileStat() {
  const { t } = useTranslation();
  return (
    <section className="relative flex flex-col gap-2 border-b-[1px] border-theme-light-bg-third  px-5 py-2 lg:mx-5 lg:gap-4 lg:px-0 lg:py-4 dark:border-theme-dark-bg-third">
      <h1 className="pb-2 font-abri text-lg lg:text-2xl">
        {t("page.profile.stat")}
      </h1>
      <div className="border-b-[1px] border-theme-light-bg-third pb-2 dark:border-theme-dark-bg-third">
        <ViewPercentage />
      </div>
      <div className="pb-2">
        <DecadeCount />
      </div>
    </section>
  );
}
