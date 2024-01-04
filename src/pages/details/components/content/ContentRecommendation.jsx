import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatFullDate } from "../../../../services/utils";
import instanceTmdb from "../../../../services/instances";
import { notifyError } from "../../../../components/toasts/Toast";
import Carousel from "../../../../components/Carousel";
import PropTypes from "prop-types";

export default function ContentRecommendation({ contentId }) {
  const { type } = useParams();
  const [recommendations, setRecommendations] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (contentId) {
      instanceTmdb
        .get(
          `/${type}/${contentId}/recommendations?language=${i18n.language}&page=1`
        )
        .then(({ data }) => {
          setRecommendations(data.results);
        })
        .catch(() => {
          notifyError(t("toast.error"));
        });
    }
  }, [type, contentId, i18n.language, t]);

  if (recommendations?.length === 0) return null;
  return (
    <section className="relative flex flex-col gap-2 pb-3 pt-2 lg:mx-5 lg:gap-4 lg:py-4">
      <h1 className="px-5 font-abri text-lg lg:px-0 lg:text-2xl">
        {t("page.detail.media.recommandations")}
      </h1>
      <Carousel
        leftPosition="-left-20 top-[calc(50%-8.75rem)]"
        rightPosition="-right-20 top-[calc(50%-8.75rem)]"
        containerHeight="h-80"
        btnHeight="h-8"
        btnWidth="w-8"
        textSize="text-xl"
        leftScrollLength={-200}
        rightScrollLength={200}
      >
        {recommendations
          ?.sort((a, b) => b.vote_count - a.vote_count)
          .slice(0, 10)
          .map((el) => (
            <li className="snap-end lg:snap-start" key={el.id}>
              <Link
                to={`/details/${el.media_type}/${el.id}`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-block"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                  alt=""
                  className="h-60 rounded-md border-[1px] border-theme-light-bg-third object-cover lg:h-64 dark:border-theme-dark-bg-third"
                />
                <div className="w-0 min-w-full pl-1 pt-1">
                  <h2 className="line-clamp-1 text-base font-medium">
                    {el.title || el.name}
                  </h2>
                  <p className="text-xs italic lg:text-sm dark:text-theme-dark-text-secondary">
                    {formatFullDate(el.release_date || el.first_air_date)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
      </Carousel>
    </section>
  );
}

ContentRecommendation.propTypes = {
  contentId: PropTypes.number.isRequired,
};
