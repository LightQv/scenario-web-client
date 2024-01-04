import SortSelector from "./SortSelector";
import GenreSelector from "./GenreSelector";
import PlusSvg from "../../../../components/svg/action/PlusSvg";
import MinusSvg from "../../../../components/svg/action/MinusSvg";
import PropTypes from "prop-types";

export default function MobileFilterBar({
  scrollTop,
  showFilter,
  setShowFilter,
}) {
  return (
    <section className="fixed left-0 top-12 z-20 flex w-full flex-col items-center justify-center gap-2 pb-2">
      <GenreSelector scrollTop={scrollTop} showFilter={showFilter} />
      <SortSelector scrollTop={scrollTop} showFilter={showFilter} />
      <button
        type="button"
        onClick={() => setShowFilter(!showFilter)}
        className="absolute right-4 top-1 z-50 flex h-6 w-6 items-center justify-center rounded-md bg-theme-light-bg-third text-xl shadow-md transition-all hover:bg-theme-light-bg-quad active:bg-theme-light-bg-quad dark:bg-theme-dark-bg-third dark:shadow-none dark:hover:bg-theme-dark-bg-quad dark:active:bg-theme-dark-bg-quad"
      >
        {showFilter ? <MinusSvg /> : <PlusSvg />}
      </button>
    </section>
  );
}

MobileFilterBar.propTypes = {
  scrollTop: PropTypes.number.isRequired,
  showFilter: PropTypes.bool.isRequired,
  setShowFilter: PropTypes.func.isRequired,
};
