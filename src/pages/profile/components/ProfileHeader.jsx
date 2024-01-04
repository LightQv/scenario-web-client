import { useTranslation } from "react-i18next";
import { runtimeConvert } from "../../../services/utils";
import PropTypes from "prop-types";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";

export default function ProfileHeader({
  username,
  movieViewsCount,
  tvViewsCount,
  movieRuntime,
  tvRuntime,
}) {
  const { t } = useTranslation();

  return (
    <section className="mx-5 flex flex-col gap-2 border-b-[1px] border-theme-light-bg-third pt-3 lg:gap-4 lg:pt-6 dark:border-theme-dark-bg-third">
      <div className="flex w-full items-center justify-between">
        <h1 className="w-3/4 font-abri text-2xl lg:text-4xl">{username}</h1>
        <Link to="/profile/settings">
          <Button activeColor="hover:border-theme-light-main hover:text-theme-light-main dark:hover:border-theme-dark-main dark:hover:text-theme-dark-main active:border-theme-light-main active:text-theme-light-main dark:active:border-theme-dark-main dark:active:text-theme-dark-main">
            {t("button.profile.settings")}
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="w-fit rounded-2xl bg-theme-light-bg-third px-3 py-2 text-xs shadow-sm lg:px-4 lg:text-sm dark:bg-theme-dark-bg-third">
          <p>
            {movieViewsCount}{" "}
            {movieViewsCount > 1 ? t("stats.movies") : t("stats.movie")}
          </p>
        </div>
        <div className="w-fit rounded-2xl bg-theme-light-bg-third px-3 py-2 text-xs shadow-sm lg:px-4 lg:text-sm dark:bg-theme-dark-bg-third">
          <p>
            {tvViewsCount} {tvViewsCount > 1 ? t("stats.tvs") : t("stats.tv")}
          </p>
        </div>
        <div className="w-fit rounded-2xl bg-theme-light-bg-third px-3 py-2 text-xs shadow-sm lg:px-4 lg:text-sm dark:bg-theme-dark-bg-third">
          <p>
            {runtimeConvert(movieRuntime)} {t("stats.movieRuntime")}
          </p>
        </div>
        <div className="w-fit rounded-2xl bg-theme-light-bg-third px-3 py-2 text-xs shadow-sm lg:px-4 lg:text-sm dark:bg-theme-dark-bg-third">
          <p>
            {tvRuntime}{" "}
            {tvRuntime > 1 ? t("stats.tvsRuntime") : t("stats.tvRuntime")}
          </p>
        </div>
      </div>
      <p className="mb-2 text-justify indent-4 text-xs leading-5 lg:mb-6 lg:text-sm dark:text-theme-dark-text-secondary">
        {t("page.profile.description")}
      </p>
    </section>
  );
}

ProfileHeader.propTypes = {
  username: PropTypes.string,
  movieViewsCount: PropTypes.number,
  tvViewsCount: PropTypes.number,
  movieRuntime: PropTypes.number,
  tvRuntime: PropTypes.number,
};
