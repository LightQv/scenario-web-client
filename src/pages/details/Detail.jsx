import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import instanceTmdb from "../../services/instances";
import { notifyError } from "../../components/toasts/Toast";
import MovieDetails from "./MovieDetails";
import TvDetails from "./TvDetails";
import PersonDetails from "./PersonDetails";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import CreateMedia from "./components/content/action/CreateMedia.jsx";

export default function Detail() {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  //--- Fetch Data's details based on type Params ---//
  useEffect(() => {
    if (type && id) {
      setLoading(true);
      instanceTmdb
        .get(
          `/${type}/${id}?language=${i18n.language}&append_to_response=videos`
        )
        .then(({ data }) => {
          setData(data);
          setLoading(false);
        })
        .catch(() => {
          notifyError(t("toast.errorTMDB"));
          navigate("/not-found");
        });
    }
  }, [type, id, i18n.language, t, navigate]);

  return (
    <main className="relative flex min-h-screen justify-between bg-theme-light-bg-primary pt-12 font-fira 2xl:mx-auto 3xl:w-1/2 dark:bg-theme-dark-bg-primary dark:text-theme-dark-text-primary">
      {loading && (
        <div className="m-auto">
          <Loader />
        </div>
      )}
      {!loading && data && type === "movie" && (
        <MovieDetails data={data} setShowWatchlist={setShowWatchlist} />
      )}
      {!loading && data && type === "tv" && (
        <TvDetails data={data} setShowWatchlist={setShowWatchlist} />
      )}
      {!loading && data && type === "person" && <PersonDetails data={data} />}
      {showWatchlist && (
        <Modal
          showModal={showWatchlist}
          setShowModal={setShowWatchlist}
          //--- Props for Watchlist Action ----//
          genres={data.genres}
          poster={data.poster_path}
          release={data.release_date ? data.release_date : data.first_air_date}
          runtime={data.runtime}
          episodesNumber={data.number_of_episodes}
          title={data.title ? data.title : data.name}
        >
          <CreateMedia />
        </Modal>
      )}
    </main>
  );
}
