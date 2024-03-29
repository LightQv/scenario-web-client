import { useParams, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loader from "../../components/ui/Loader";
import { instanceAPI } from "../../services/instances";
import { useTranslation } from "react-i18next";
import MediaCard from "../../components/MediaCard";
import Dropdown from "../../components/ui/Dropdown";
import WatchlistAction from "./components/action/WatchlistAction";
import { notifyError } from "../../components/toasts/Toast";
import Modal from "../../components/ui/Modal";
import UpdateWatchlist from "./components/action/UpdateWatchlist";
import ScrollTopBtn from "../../components/ui/ScrollTopBtn";
import DeleteWatchlist from "./components/action/DeleteWatchlist";
import CheckSvg from "../../components/svg/action/CheckSvg";
import DeleteMedia from "./components/action/DeleteMedia";
import GenreSelector from "./components/GenreSelector";
import GenresContext from "../../contexts/GenresContext";
import ShiftMedia from "./components/action/ShiftMedia";

export default function WatchlistContent() {
  const { id } = useParams();
  const { totalGenres } = useContext(GenresContext);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showEditShift, setShowEditShift] = useState(false);
  const [showEditDelete, setShowEditDelete] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState("");
  const [showRename, setShowRename] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [updated, setUpdated] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const currentGenre = searchParams.get("genre") || "";
    setLoading(true);
    if (id) {
      instanceAPI
        .get(`/api/v1/watchlists/detail/${id}?genre=${currentGenre}`)
        .then((res) => {
          setMedia(res.data);
          setUpdated(false);
          setLoading(false);
        })
        .catch((err) => {
          if (err.request?.status !== 403) {
            notifyError(t("toast.error"));
          }
        });
    }
  }, [id, t, updated, searchParams]);

  return (
    <main className="relative flex min-h-screen justify-between bg-theme-light-bg-primary pt-12 font-fira 2xl:mx-auto 3xl:w-1/2 dark:bg-theme-dark-bg-primary dark:text-theme-dark-text-primary">
      {loading && (
        <div className="m-auto">
          <Loader />
        </div>
      )}
      {!loading && media && (
        <div className="w-full lg:mx-auto lg:w-2/3 lg:pt-8">
          <section className="mx-5 flex flex-col gap-2 border-b-[1px] border-theme-light-bg-third pt-3 lg:gap-4 lg:pt-6 dark:border-theme-dark-bg-third">
            <div className="relative flex justify-between">
              <h1 className="w-4/5 font-abri text-2xl lg:text-4xl">
                {media.title}
              </h1>
              <div className="absolute right-0 top-2 flex gap-2 text-theme-light-main lg:gap-4 dark:text-theme-dark-main">
                {showEdit && (
                  <button onClick={() => setShowEdit(false)}>
                    <CheckSvg />
                  </button>
                )}
                <Dropdown
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                  color="stroke-theme-light-text-primary dark:stroke-theme-dark-text-primary hover:stroke-theme-light-main hover:stroke-theme-dark-main"
                >
                  <WatchlistAction
                    setShowEdit={setShowEdit}
                    setShowModal={setShowRename}
                    setShowModalDelete={setShowDelete}
                  />
                </Dropdown>
              </div>
            </div>
            <p className="mb-2 text-justify indent-4 text-xs leading-5 lg:mb-6 lg:text-sm dark:text-theme-dark-text-secondary">
              {media._count.medias}{" "}
              {media._count.medias > 1
                ? t("page.watchlist.count.plurial")
                : t("page.watchlist.count.singular")}
            </p>
          </section>
          <GenreSelector genre={totalGenres} />
          {media.medias?.length > 0 ? (
            <ul className="grid grid-flow-row pb-2 lg:grid-cols-2">
              {media.medias
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((el) => (
                  <MediaCard
                    data={el}
                    key={el.id}
                    showEdit={showEdit}
                    setShowEditShift={setShowEditShift}
                    setShowEditDelete={setShowEditDelete}
                    setSelectedMedia={setSelectedMedia}
                  />
                ))}
            </ul>
          ) : (
            <p className="mt-4 text-center text-sm italic lg:text-base">
              {t("error.noContent")}
            </p>
          )}
        </div>
      )}
      <ScrollTopBtn />
      {showEditDelete && (
        <Modal showModal={showEditDelete} setShowModal={setShowEditDelete}>
          <DeleteMedia
            setShowModal={setShowEditDelete}
            setUpdated={setUpdated}
            dataId={selectedMedia}
          />
        </Modal>
      )}
      {showEditShift && (
        <Modal showModal={showEditDelete} setShowModal={setShowEditDelete}>
          <ShiftMedia
            setShowModal={setShowEditShift}
            setUpdated={setUpdated}
            data={selectedMedia}
          />
        </Modal>
      )}
      {showRename && (
        <Modal showModal={showRename} setShowModal={setShowRename}>
          <UpdateWatchlist
            setShowModal={setShowRename}
            setUpdated={setUpdated}
            title={media.title}
          />
        </Modal>
      )}
      {showDelete && (
        <Modal showModal={showDelete} setShowModal={setShowDelete}>
          <DeleteWatchlist setShowModal={setShowDelete} />
        </Modal>
      )}
    </main>
  );
}
