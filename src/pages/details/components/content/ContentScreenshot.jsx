import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import instanceTmdb from "../../../../services/instances";
import { notifyError } from "../../../../components/toasts/Toast";
import Carousel from "../../../../components/ui/Carousel";
import PropTypes from "prop-types";
import Modal from "../../../../components/ui/Modal";
import ScreenshotFull from "./action/ScreenshotFull";

export default function ContentScreenshot({ contentId }) {
  const { type } = useParams();
  const [screenshots, setScreenshots] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const { t } = useTranslation();
  const [clientWidth] = useWindowSize();

  useEffect(() => {
    if (contentId) {
      instanceTmdb
        .get(`/${type}/${contentId}/images`)
        .then(({ data }) => {
          setScreenshots(data);
        })
        .catch(() => {
          notifyError(t("toast.error"));
        });
    }
  }, [type, contentId, t]);

  const handleOpenModal = (path) => {
    setIsShow(true);
    setSelectedScreenshot(path);
  };

  if (screenshots?.backdrops.length === 0) return null;
  return (
    <section className="relative flex flex-col gap-2 border-b-[1px] border-gray-200 pb-3 pt-2 lg:mx-5 lg:gap-4 lg:py-4 dark:border-theme-dark-bg-third">
      <h1 className="px-5 font-abri text-lg lg:px-0 lg:text-2xl">
        {t("page.detail.media.screenshots")}
      </h1>
      {screenshots && (
        <Carousel
          leftPosition="-left-20 top-[calc(50%-8.75rem)]"
          rightPosition="-right-20 top-[calc(50%-8.75rem)]"
          containerHeight="h-80"
          btnHeight="h-8"
          btnWidth="w-8"
          textSize="text-xl"
          leftScrollLength={-400}
          rightScrollLength={400}
        >
          {screenshots?.backdrops
            .sort((el) => el.vote_count)
            .slice(0, 10)
            .map((screen, index) => (
              <li className="snap-x lg:snap-start" key={index}>
                <button
                  type="button"
                  className="h-full w-full"
                  onClick={() => handleOpenModal(screen.file_path)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/${
                      clientWidth >= 1024 ? "original" : "w500"
                    }/${screen.file_path}`}
                    alt={`screen ${index}`}
                    className="h-52 rounded-md border-[1px] border-theme-light-bg-third object-cover lg:h-80 dark:border-theme-dark-bg-third"
                  />
                </button>
              </li>
            ))}
        </Carousel>
      )}
      {isShow && selectedScreenshot && (
        <Modal setShowModal={setIsShow}>
          <ScreenshotFull src={selectedScreenshot} setShowModal={setIsShow} />
        </Modal>
      )}
    </section>
  );
}

ContentScreenshot.propTypes = {
  contentId: PropTypes.number.isRequired,
};
