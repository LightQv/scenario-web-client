import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sortArr } from "../../../../services/data";
import PropTypes from "prop-types";

export default function SortSelector({ scrollTop, showFilter }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const changeSort = (e) => {
    if (e.target.value === "0") {
      searchParams.delete("sort_by");
    } else {
      searchParams.set("sort_by", e.target.value);
    }
    const pageNumber = 1;
    searchParams.set("page", pageNumber.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      className={`${
        scrollTop !== 0 || !showFilter ? "hidden opacity-0" : "flex opacity-100"
      } items-center gap-2 transition-all`}
    >
      <h1 className="text-xs">{t("sort.title")}</h1>
      <select
        defaultValue={searchParams.get("sort_by") || undefined}
        onChange={changeSort}
        className="h-fit w-fit rounded-md border-[1px] border-theme-light-text-primary bg-transparent px-4 py-2 text-xs hover:cursor-pointer hover:border-theme-light-main hover:text-theme-light-main dark:border-theme-dark-text-primary dark:hover:border-theme-dark-main dark:hover:text-theme-dark-main"
      >
        {sortArr &&
          sortArr.map((sort) => (
            <option value={sort.value} key={sort.id}>
              {sort.label}
            </option>
          ))}
      </select>
    </section>
  );
}

SortSelector.propTypes = {
  scrollTop: PropTypes.number.isRequired,
  showFilter: PropTypes.bool.isRequired,
};
