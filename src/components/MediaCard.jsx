import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { durationConvert, formatFullDate } from "../services/utils";
import PropTypes from "prop-types";
import { useView } from "../hooks/useView";
import ViewSvg from "./svg/action/ViewSvg";
import DeleteSvg from "./svg/action/DeleteSvg";

export default function MediaCard({
  data,
  showEdit,
  setShowEditDelete,
  setSelectedMedia,
}) {
  const location = useLocation();
  const { viewed } = useView(data.dataId, data.type);
  const { t } = useTranslation();

  const handleMediaSelect = () => {
    setSelectedMedia(data.id);
    setShowEditDelete(true);
  };

  return (
    <li
      className={`${
        !showEdit &&
        "hover:bg-theme-light-bg-secondary dark:hover:bg-theme-dark-bg-secondary"
      } relative flex px-5 py-2 font-fira after:absolute after:bottom-0 after:left-[50%] after:w-[calc(100%-2.5rem)] after:-translate-x-[50%] after:border-b-[1px] after:border-gray-200 last:after:border-none lg:after:hidden dark:after:border-theme-dark-bg-third`}
    >
      <Link
        aria-disabled={showEdit}
        to={!showEdit && `/details/${data.type}/${data.dataId}`}
        className="relative flex h-fit w-full items-center justify-between"
      >
        <div className="flex h-full items-center justify-start gap-4 pr-2 transition-all lg:w-2/3">
          {showEdit && (
            <button
              className="text-theme-light-secondary dark:text-theme-dark-secondary"
              onClick={() => handleMediaSelect()}
            >
              <DeleteSvg />
            </button>
          )}
          <section className="h-full">
            <h1 className="line-clamp-1 font-abri text-base lg:text-lg">
              {data.title}
            </h1>
            <h2 className="text-xs italic lg:text-sm dark:text-theme-dark-text-secondary">
              {data.type === "movie" &&
                `${formatFullDate(data.release_date)} • ${durationConvert(
                  data.runtime
                )}`}
              {data.type === "tv" &&
                (data.runtime > 1
                  ? `${data.runtime} ${t("detail.seasons.episode.plurial")}`
                  : `${data.runtime} ${t("detail.seasons.episode.singular")}`)}
            </h2>
          </section>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w200/${data.poster_path}`}
          alt={data.name}
          className="h-16 rounded-sm border-[1px] border-theme-light-bg-third object-cover lg:h-24 dark:border-theme-dark-bg-third"
        />
        {viewed && location.pathname !== "/profile" && (
          <section className="absolute -bottom-1 -right-1 flex items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-theme-light-bg-third stroke-theme-light-text-primary shadow-md dark:bg-theme-dark-bg-third dark:stroke-theme-dark-text-primary">
              <ViewSvg />
            </div>
          </section>
        )}
      </Link>
    </li>
  );
}

MediaCard.propTypes = {
  data: PropTypes.shape().isRequired,
  showEdit: PropTypes.bool,
  setShowEditDelete: PropTypes.func,
  setSelectedMedia: PropTypes.func,
};
