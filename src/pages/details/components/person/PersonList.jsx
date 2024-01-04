import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import instanceTmdb from "../../../../services/instances";
import { formatFullDate } from "../../../../services/utils";
import Carousel from "../../../../components/Carousel";
import { notifyError } from "../../../../components/toasts/Toast";

export default function PersonList() {
  const { type, id } = useParams();
  const [creditList, setCreditList] = useState(null);
  const { t, i18n } = useTranslation();

  //--- Fetch Movies & TV Shows the person's been credited for ---//
  useEffect(() => {
    if (type === "person") {
      instanceTmdb
        .get(`/${type}/${id}/combined_credits?language=${i18n.language}'`)
        .then(({ data }) => {
          setCreditList(data);
        })
        .catch(() => notifyError(t("toast.error")));
    }
  }, [type, id, i18n.language, t]);

  const creditsByPopularity = creditList?.cast
    ?.sort((a, b) => b.vote_count - a.vote_count)
    ?.filter((el) => el?.vote_count >= 500)
    .slice(0, 10);

  if (!creditsByPopularity) return null;
  return (
    <section className="relative flex flex-col gap-2 pb-3 pt-2 lg:mx-5 lg:gap-4 lg:py-4">
      <h1 className="px-5 font-abri text-lg lg:px-0 lg:text-2xl">
        {t("page.person.title")}
      </h1>
      <Carousel>
        {creditsByPopularity?.map((el) => (
          <li className="snap-end lg:snap-start" key={el.id}>
            <Link
              to={`/details/${el.first_air_date ? "tv" : "movie"}/${el.id}`}
              className="inline-block"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                alt=""
                className="h-60 w-40 rounded-md border-[1px] border-theme-light-bg-third object-cover lg:h-64 lg:w-44 dark:border-theme-dark-bg-third"
              />
              <div className="w-0 min-w-full pl-1 pt-1">
                <h2 className="line-clamp-1 text-base font-medium">
                  {el.character}
                </h2>
                <h3 className="-mt-1 line-clamp-1 text-sm dark:text-theme-dark-text-secondary">
                  {el.title || el.name}
                </h3>
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
