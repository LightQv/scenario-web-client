import React, { useRef } from "react";
import CloseSvg from "./svg/nav/CloseSvg";
import PropTypes from "prop-types";

export default function Modal({
  showModal,
  setShowModal,
  setUpdated,
  src,
  email,
  genres,
  poster,
  release,
  runtime,
  episodesNumber,
  title,
  dataId,
  children,
}) {
  const elRef = useRef(null);

  const closeModal = (e) => {
    const target = e.target;
    //--- Check which element being clicked on ---//
    if (target.matches("button") && !elRef.current?.contains(target)) {
      setShowModal(false);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-theme-light-bg-opacity text-theme-light-text-secondary filter backdrop-blur-sm dark:bg-theme-dark-bg-blury dark:text-theme-dark-text-primary">
      {/* Modal Close Action */}
      <button
        type="button"
        onClick={closeModal}
        className="absolute left-0 top-0 z-20 h-full w-full"
      />
      {showModal && (
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="absolute right-4 top-3 z-50 h-fit w-fit lg:hidden"
        >
          <CloseSvg />
        </button>
      )}
      {/* Modal Content */}
      {React.cloneElement(children, {
        elRef: elRef,
        setShowModal: setShowModal,
        setUpdated: setUpdated,
        src: src,
        email: email,
        genres: genres,
        poster: poster,
        release: release,
        runtime: runtime,
        episodesNumber: episodesNumber,
        title: title,
        dataId: dataId,
      })}
    </div>
  );
}

Modal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  setUpdated: PropTypes.func,
  src: PropTypes.string,
  email: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.shape()),
  poster: PropTypes.string,
  release: PropTypes.string,
  runtime: PropTypes.number,
  episodesNumber: PropTypes.number,
  title: PropTypes.string,
  dataId: PropTypes.string,
  children: PropTypes.element,
};
