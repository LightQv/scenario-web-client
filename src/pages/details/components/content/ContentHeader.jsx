import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import UserContext from "../../../../contexts/UserContext";
import { durationConvert, formatFullDate } from "../../../../services/utils";
import ViewSvg from "../../../../components/svg/action/ViewSvg";
import BookmarkSvg from "../../../../components/svg/action/BookmarkSvg";
import PropTypes from "prop-types";
import { useView } from "../../../../hooks/useView";
import { useBookmark } from "../../../../hooks/useBookmark";

export default function ContentHeader({
  title,
  original_title,
  genres,
  release,
  runtime,
  status,
  start,
  end,
  seasonsNumber,
  episodesNumber,
  synopsis,
}) {
  const { type, id } = useParams();
  const { user } = useContext(UserContext);
  const { viewed } = useView(id, type);
  const { bookmarked } = useBookmark(id);
  const { t } = useTranslation();

  return (
    <section className="mx-5 flex flex-col gap-2 border-b-[1px] border-theme-light-bg-third pt-3 lg:gap-4 lg:pt-6 dark:border-theme-dark-bg-third">
      <div>
        <h1 className="w-3/4 font-abri text-2xl lg:text-4xl">{title}</h1>
        <h2 className="w-3/4 text-base italic text-theme-light-bg-quad lg:text-lg dark:text-theme-dark-text-secondary">
          {original_title}
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {genres?.slice(0, 3).map((genre) => (
          <Link
            to={`/discover?media=${type}&page=1&genre=${genre.id}`}
            className="w-fit rounded-2xl bg-theme-light-bg-third px-3 py-2 text-xs shadow-sm hover:bg-theme-light-bg-quad lg:px-4 lg:text-sm dark:bg-theme-dark-bg-third dark:hover:bg-theme-dark-bg-quad"
            key={genre.id}
          >
            <p>{genre.name}</p>
          </Link>
        ))}
        {user.id && type !== "person" && (bookmarked || viewed) && (
          <div className="ml-auto flex gap-2">
            {bookmarked && (
              <section className="flex h-8 w-8 items-center justify-center rounded-full bg-theme-light-bg-third stroke-theme-light-text-primary lg:h-9 lg:w-9 dark:bg-theme-dark-bg-third dark:stroke-theme-dark-text-primary">
                <BookmarkSvg />
              </section>
            )}
            {viewed && (
              <section className="flex h-8 w-8 items-center justify-center rounded-full bg-theme-light-bg-third stroke-theme-light-text-primary lg:h-9 lg:w-9 dark:bg-theme-dark-bg-third dark:stroke-theme-dark-text-primary">
                <ViewSvg />
              </section>
            )}
          </div>
        )}
      </div>
      {type === "movie" && (
        <h3 className="text-xs italic lg:text-sm dark:text-theme-dark-text-secondary">
          {formatFullDate(release)} • {durationConvert(runtime)}
        </h3>
      )}
      {type === "tv" && (
        <h3 className="text-xs italic lg:text-sm dark:text-theme-dark-text-secondary">
          {`${status} • ${formatFullDate(start)} ${
            end ? `- ${formatFullDate(end)}` : ""
          } • ${seasonsNumber} ${
            seasonsNumber > 1
              ? t("page.detail.media.seasons.season.plurial")
              : t("page.detail.media.seasons.season.singular")
          } •
      ${episodesNumber} ${
        episodesNumber > 1
          ? t("page.detail.media.seasons.episode.plurial")
          : t("page.detail.media.seasons.episode.singular")
      }`}
        </h3>
      )}
      <p className="mb-2 text-justify indent-4 text-xs leading-5 lg:mb-6 lg:text-base dark:text-theme-dark-text-secondary">
        {synopsis ? synopsis : t("error.noSynopsis")}
      </p>
    </section>
  );
}

ContentHeader.propTypes = {
  title: PropTypes.string.isRequired,
  original_title: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.shape()),
  synopsis: PropTypes.string.isRequired,
  release: PropTypes.string,
  runtime: PropTypes.number,
  status: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  seasonsNumber: PropTypes.number,
  episodesNumber: PropTypes.number,
  poster: PropTypes.string,
};
