import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { useTranslation } from "react-i18next";
import { instanceAPI } from "../../services/instances";
import { notifyError } from "../../components/toasts/Toast";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import WatchlistCard from "./components/WatchlistCard";
import Modal from "../../components/ui/Modal";
import CreateWatchlist from "./components/action/CreateWatchlist";

export default function Watchlist() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [watchlists, setWatchlists] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [watchlistUpdated, setWatchlistUpdated] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    if (user.id) {
      instanceAPI(`/api/v1/watchlists/${user.id}`)
        .then((res) => {
          setWatchlists(res.data);
          setWatchlistUpdated(false);
        })
        .catch(() => notifyError(t("toast.error")))
        .finally(() => setLoading(false));
    }
  }, [user.id, watchlistUpdated, t]);

  return (
    <main className="relative flex min-h-screen justify-between bg-theme-light-bg-primary pt-12 font-fira 2xl:mx-auto 3xl:w-1/2 dark:bg-theme-dark-bg-primary dark:text-theme-dark-text-primary">
      {loading && (
        <div className="m-auto">
          <Loader />
        </div>
      )}
      {!loading && (
        <div className="w-full lg:mx-auto lg:w-2/3 lg:pt-8">
          <section className="mx-5 flex flex-col gap-2 border-b-[1px] border-theme-light-bg-third pt-3 lg:gap-4 lg:pt-6 dark:border-theme-dark-bg-third">
            <h1 className="w-3/4 font-abri text-2xl lg:text-4xl">
              {t("page.watchlist.title")}
            </h1>
            <p className="mb-2 text-justify indent-4 text-xs leading-5 lg:mb-6 lg:text-sm dark:text-theme-dark-text-secondary">
              {t("page.watchlist.subtitle")}
            </p>
          </section>
          {watchlists && (
            <ul className="grid grid-flow-row pb-2 lg:grid-cols-2">
              <li className="relative flex px-5 py-2 font-fira after:absolute after:bottom-0 after:left-[50%] after:w-[calc(100%-2.5rem)] after:-translate-x-[50%] after:border-b-[1px] after:border-gray-200 last:after:border-none lg:col-span-2 dark:after:border-theme-dark-bg-third">
                <div className="flex h-16 w-full items-center justify-center lg:h-16">
                  <Button
                    onClick={() => setShowCreateModal(true)}
                    activeColor="hover:border-theme-light-main hover:text-theme-light-main dark:hover:border-theme-dark-main dark:hover:text-theme-dark-main active:border-theme-light-main active:text-theme-light-main dark:active:border-theme-dark-main dark:active:text-theme-dark-main"
                  >
                    {t("button.watchlist.create")}
                  </Button>
                </div>
              </li>
              {watchlists.length > 0 &&
                watchlists
                  .sort((a, b) => {
                    // SYSTEM watchlists first
                    if (a.type === "SYSTEM" && b.type !== "SYSTEM") return -1;
                    if (a.type !== "SYSTEM" && b.type === "SYSTEM") return 1;
                    // Then sort alphabetically by title
                    return a.title.localeCompare(b.title);
                  })
                  .map((el) => <WatchlistCard el={el} key={el.id} />)}
            </ul>
          )}
        </div>
      )}
      {showCreateModal && (
        <Modal showModal={showCreateModal} setShowModal={setShowCreateModal}>
          <CreateWatchlist
            setUpdated={setWatchlistUpdated}
            setShowModal={setShowCreateModal}
          />
        </Modal>
      )}
    </main>
  );
}
