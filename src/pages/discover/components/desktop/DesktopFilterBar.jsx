import GenreBar from "./GenreBar";
import SortBar from "./SortBar";

export default function DesktopFilterBar() {
  return (
    <section className="fixed left-0 top-16 z-20 flex w-screen flex-col items-center justify-center gap-1 bg-theme-light-bg-primary pb-2 dark:bg-theme-dark-bg-primary">
      <GenreBar />
      <SortBar />
    </section>
  );
}
