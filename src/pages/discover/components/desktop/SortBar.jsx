import { useSearchParams } from "react-router-dom";
import { sortArr } from "../../../../services/data";

export default function SortBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  //--- Change Genre, add/remove it to searchParams & reset Pagination to 1 ---//
  const changeSort = (value) => {
    if (value === sortArr[0].value) {
      searchParams.delete("sort_by");
    } else {
      searchParams.set("sort_by", value);
    }
    const pageNumber = 1;
    searchParams.set("page", pageNumber.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <ul className="grid snap-x auto-cols-max grid-flow-col gap-2 overflow-x-scroll overscroll-contain bg-theme-light-bg-primary scrollbar-none dark:bg-theme-dark-bg-primary">
        {sortArr.map((sort) => (
          <li
            key={sort.id}
            className={`h-fit w-max snap-start rounded-md border-[1px] text-xs transition-all hover:border-theme-dark-main hover:text-theme-light-main dark:hover:border-theme-dark-main dark:hover:text-theme-dark-main ${
              searchParams.get("sort_by") === sort.value ||
              ("popularity.desc" === sort.value && !searchParams.get("sort_by"))
                ? "border-theme-light-main text-theme-light-main dark:border-theme-dark-main dark:text-theme-dark-main"
                : "border-current bg-transparent"
            }`}
          >
            <button
              type="button"
              className="h-full w-full px-2 py-1"
              onClick={() => changeSort(sort.value)}
            >
              {sort.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
