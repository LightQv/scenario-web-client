import ArrowUpSvg from "./svg/action/ArrowUpSvg";

export default function ScrollTopBtn() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      className="fixed bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-theme-light-bg-third shadow-md transition-all hover:animate-bounce hover:bg-theme-light-bg-quad active:bg-theme-light-bg-quad lg:bottom-4 lg:right-4 dark:bg-theme-dark-bg-third dark:shadow-none dark:hover:bg-theme-dark-bg-quad dark:active:bg-theme-dark-bg-quad"
    >
      <ArrowUpSvg />
    </button>
  );
}
