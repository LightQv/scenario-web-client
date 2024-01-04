import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import GenresContext from "../../../../contexts/GenresContext";
import { useTranslation } from "react-i18next";
import Carousel from "../../../../components/Carousel";

export default function GenreBar() {
  const { movieGenres, tvGenres } = useContext(GenresContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  //--- Change Genre, add/remove it to searchParams & reset Pagination to 1 ---//
  const clickGenre = (id) => {
    if (id === "0") {
      searchParams.delete("genre");
    } else {
      searchParams.set("genre", id);
    }
    const pageNumber = 1;
    searchParams.set("page", pageNumber.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //--- Determine which genre Array to map ---//
  const chooseDataType = () => {
    if (searchParams.get("media") === "movie")
      return movieGenres.sort((a, b) => a.name.localeCompare(b.name));
    if (searchParams.get("media") === "tv")
      return tvGenres.sort((a, b) => a.name.localeCompare(b.name));
  };

  if (!movieGenres || !tvGenres || !searchParams.get("media")) return null;
  return (
    <div className="relative flex h-fit w-2/3 justify-center">
      <Carousel
        leftPosition="-left-12 top-[calc(50%-1.25rem)]"
        rightPosition="-right-12 top-[calc(50%-1.25rem)]"
        textSize="text-xs"
        containerHeight="h-full"
        btnHeight="h-6"
        btnWidth="w-6"
        leftScrollLength={-400}
        rightScrollLength={400}
      >
        <li
          className={`h-fit w-max snap-start rounded-md border-[1px] text-xs transition-all hover:border-theme-dark-main hover:text-theme-light-main dark:hover:border-theme-dark-main dark:hover:text-theme-dark-main ${
            !searchParams.get("genre")
              ? "border-theme-light-main text-theme-light-main dark:border-theme-dark-main dark:text-theme-dark-main"
              : "border-current bg-transparent"
          }`}
        >
          <button
            type="button"
            className="h-full w-full px-2 py-1"
            onClick={() => clickGenre("0")}
          >
            {t("filter.every")}
          </button>
        </li>
        {chooseDataType()?.map((genre, index) => (
          <li
            key={index}
            className={`h-fit w-max snap-start rounded-md border-[1px] text-xs transition-all hover:border-theme-dark-main hover:text-theme-light-main dark:hover:border-theme-dark-main dark:hover:text-theme-dark-main ${
              searchParams.get("genre") === genre.id.toString()
                ? "border-theme-light-main text-theme-light-main dark:border-theme-dark-main dark:text-theme-dark-main"
                : "border-current bg-transparent"
            }`}
          >
            <button
              type="button"
              className="h-full w-full px-2 py-1"
              onClick={() => clickGenre(genre.id)}
            >
              {genre.name}
            </button>
          </li>
        ))}
      </Carousel>
    </div>
  );
}
