import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sortArr } from "../../../../services/data";
import Selector from "../../../../components/ui/Selector";
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
      <Selector
        defaultValue={searchParams.get("sort_by") || undefined}
        onChange={changeSort}
      >
        {sortArr &&
          sortArr.map((sort) => (
            <option value={sort.value} key={sort.id}>
              {sort.label}
            </option>
          ))}
      </Selector>
    </section>
  );
}

SortSelector.propTypes = {
  scrollTop: PropTypes.number.isRequired,
  showFilter: PropTypes.bool.isRequired,
};
