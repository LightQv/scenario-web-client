import PropTypes from "prop-types";

export default function ScreenshotFull({ setShowModal, src, elRef }) {
  return (
    <button
      type="button"
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-theme-dark-bg-blury filter backdrop-blur-sm"
      ref={elRef}
      onClick={() => setShowModal(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${src}`}
        className="w-full"
      />
    </button>
  );
}

ScreenshotFull.propTypes = {
  setShowModal: PropTypes.func,

  src: PropTypes.string,
  elRef: PropTypes.shape(),
};
