import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import instanceTmdb from "../../services/instances";
import { notifyError } from "../../components/toasts/Toast";
import FilterHandler from "./components/FilterHandler";
import Loader from "../../components/Loader";
import ResultCard from "../../components/results/ResultCard";
import ReactPaginate from "react-paginate";
import NoResult from "../../components/NoResult";

export default function Discover() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  //--- Get query params from searchParams ---//
  useEffect(() => {
    const currentType = searchParams.get("media");
    const currentPage = searchParams.get("page");
    const currentSort = searchParams.get("sort_by") || "popularity.desc";
    const currentGenre = searchParams.get("genre");
    if (currentType && currentPage) {
      setLoading(true);
      instanceTmdb
        .get(
          `/discover/${currentType}?language=${i18n.language}&page=${currentPage}&sort_by=${currentSort}&vote_count.gte=500&with_genres=${currentGenre}`
        )
        .then(({ data }) => {
          setResults(data.results);
          setTotalPages(data.total_pages);
          setShowFilter(false);
          setLoading(false);
        })
        .catch(() => {
          notifyError(t("toast.errorTMDB"));
          navigate("/not-found");
        });
    }
  }, [searchParams, i18n.language, t, navigate]);

  //--- React Paginate Change Function ---//
  const handlePageChange = (obj) => {
    const page = obj.selected + 1;
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //--- Listen to any Y scroll movement ---//
  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-between bg-theme-light-bg-primary pt-8 font-fira lg:pt-14 2xl:mx-auto 3xl:w-1/2 dark:bg-theme-dark-bg-primary dark:text-theme-dark-text-primary">
      <FilterHandler
        scrollTop={scrollTop}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />
      {loading && (
        <div className="m-auto">
          <Loader />
        </div>
      )}
      {!loading && results && results.length >= 1 && (
        <div
          className={`flex w-full flex-col ${
            scrollTop !== 0 || !showFilter ? "pt-0" : "pt-20"
          } transition-all lg:items-center lg:pt-16`}
        >
          <ul className="lg:grid lg:w-2/3 lg:grid-cols-2">
            {results?.map((data, index) => (
              <ResultCard
                data={data}
                index={index}
                media_type={searchParams.get("media")}
                key={data.id}
              />
            ))}
          </ul>
          <ReactPaginate
            onPageChange={(obj) => handlePageChange(obj)}
            pageCount={totalPages}
            forcePage={
              Number(searchParams.get("page")) - 1
            } /* Reset to Page 1 when new Query */
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            previousLabel="&lt;"
            nextLabel="&gt;"
            className="flex w-full items-center justify-center gap-5 p-4 text-theme-light-text-primary dark:text-theme-dark-text-primary" /* Paginate bloc style */
            activeClassName="rounded-md border-theme-light-main dark:border-theme-dark-main dark:bg-theme-dark-main border-[1px] bg-theme-light-main text-theme-light-text-primary px-3" /* Active page style */
            pageClassName="text-sm py-1" /* None active page style */
            breakClassName="text-theme-light-main dark:text-theme-dark-main"
            previousClassName="text-xl text-theme-light-main dark:text-theme-dark-main"
            nextClassName="text-xl text-theme-light-main dark:text-theme-dark-main"
            disabledLinkClassName="text-theme-light-main cursor-default dark:text-theme-dark-text-main"
            renderOnZeroPageCount={null}
          />
        </div>
      )}
      {!loading && results && results.length === 0 && (
        <div className="flex w-full flex-col lg:items-center lg:pt-6">
          <NoResult />
        </div>
      )}
    </main>
  );
}
