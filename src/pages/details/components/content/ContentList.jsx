import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatFullDate } from "../../../../services/utils";
import instanceTmdb from "../../../../services/instances";
import { notifyError } from "../../../../components/toasts/Toast";
import Carousel from "../../../../components/Carousel";
import PropTypes from "prop-types";

export default function ContentList({ title, data }) {
  const { type, id } = useParams();
  const [credits, setCredits] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (title === t("page.detail.media.cast")) {
      instanceTmdb
        .get(`/${type}/${id}/credits?language=${i18n.language}`)
        .then(({ data }) => {
          setCredits(data);
        })
        .catch(() => {
          notifyError(t("toast.error"));
        });
    }
  }, [type, id, title, i18n.language, t]);

  return (
    <section className="relative flex flex-col gap-2 border-b-[1px] border-theme-light-bg-third py-2 lg:mx-5 lg:gap-4 lg:py-4 dark:border-theme-dark-bg-third">
      <h1 className="px-5 font-abri text-lg lg:px-0 lg:text-2xl">{title}</h1>
      {title === t("page.detail.media.cast") && credits?.cast.length > 0 && (
        <Carousel
          leftPosition="-left-20 top-[calc(50%-9rem)]"
          rightPosition="-right-20 top-[calc(50%-9rem)]"
          containerHeight="h-80"
          btnHeight="h-8"
          btnWidth="w-8"
          textSize="text-xl"
          leftScrollLength={-200}
          rightScrollLength={200}
        >
          {credits.cast.slice(0, 10).map((el) => (
            <li key={el.id} className="snap-end lg:snap-start">
              <Link to={`/details/person/${el.id}`} className="inline-block">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${el.profile_path}`}
                  alt={el.name}
                  className="h-60 min-w-40 rounded-md border-[1px] border-theme-light-bg-third object-cover lg:h-64 dark:border-theme-dark-bg-third"
                />
                <div className="w-0 min-w-full pl-1 pt-1">
                  <h2 className="line-clamp-1 text-base font-medium">
                    {el.name}
                  </h2>
                  <h3 className="-mt-1 line-clamp-1 text-sm dark:text-theme-dark-text-secondary">
                    {el.character}
                  </h3>
                  <p className="line-clamp-1 text-xs italic lg:text-sm dark:text-theme-dark-text-secondary">
                    {el.known_for_department}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </Carousel>
      )}
      {title === t("page.detail.media.seasons.title") && data?.length > 0 && (
        <Carousel
          leftPosition="-left-20 top-[calc(50%-12rem)]"
          rightPosition="-right-20 top-[calc(50%-12rem)]"
          containerHeight="h-full"
          btnHeight="h-8"
          btnWidth="w-8"
          textSize="text-xl"
          leftScrollLength={-200}
          rightScrollLength={200}
        >
          {data.map((season) => (
            <li key={season.id} className="inline-block snap-end lg:snap-start">
              <img
                src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`}
                alt={season.name}
                className="h-60 min-w-40 rounded-md border-[1px] border-theme-light-bg-third object-cover lg:h-64 dark:border-theme-dark-bg-third"
              />
              <div className="w-0 min-w-full pl-1 pt-1">
                <h2 className="text-base font-medium">{season.name}</h2>
                <p className="text-xs italic lg:text-sm dark:text-theme-dark-text-secondary">
                  {`${formatFullDate(season.air_date)} • ${
                    season.episode_count
                  } ${
                    season.episode_count > 1
                      ? t("page.detail.media.seasons.episode.plurial")
                      : t("page.detail.media.seasons.episode.singular")
                  }`}
                </p>
              </div>
            </li>
          ))}
        </Carousel>
      )}
    </section>
  );
}

ContentList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()),
};
