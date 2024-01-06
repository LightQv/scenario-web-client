import React from "react";
import MoreSvg from "./svg/action/MoreSvg";
import PropTypes from "prop-types";

export default function Dropdown({
  dropdown,
  setDropdown,
  setShowEdit,
  setShowModal,
  setShowModalDelete,
  setUpdated,
  genres,
  poster,
  release,
  runtime,
  episodesNumber,
  title,
  color,
  children,
}) {
  return (
    <div
      className="cursor-pointer text-theme-light-text-secondary"
      onClick={() => setDropdown(!dropdown)}
    >
      <MoreSvg color={color} />
      <div
        className={`${
          !dropdown && "hidden"
        } absolute right-0 top-8 z-20 flex h-fit w-52 flex-col rounded-md border-[1px] border-theme-light-bg-third bg-theme-light-bg-opacity shadow-md dark:border-theme-dark-bg-third dark:bg-theme-dark-bg-opacity dark:shadow-none`}
        onMouseLeave={() => setDropdown(false)}
      >
        {/* Dropdown Content */}
        {React.cloneElement(children, {
          setDropdown: setDropdown,
          setShowEdit: setShowEdit,
          setShowModal: setShowModal,
          setShowModalDelete: setShowModalDelete,
          setUpdated: setUpdated,
          genres: genres,
          poster: poster,
          release: release,
          runtime: runtime,
          episodesNumber: episodesNumber,
          title: title,
        })}
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  dropdown: PropTypes.bool.isRequired,
  setDropdown: PropTypes.func.isRequired,
  setShowEdit: PropTypes.func,
  setShowModal: PropTypes.func,
  setShowModalDelete: PropTypes.func,
  setUpdated: PropTypes.func,
  genres: PropTypes.arrayOf(PropTypes.shape()),
  poster: PropTypes.string,
  release: PropTypes.string,
  runtime: PropTypes.number,
  episodesNumber: PropTypes.number,
  title: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.element,
};
