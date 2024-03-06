import MoreSvg from "../svg/action/MoreSvg";
import PropTypes from "prop-types";

export default function Dropdown({ dropdown, setDropdown, color, children }) {
  return (
    <div
      className="cursor-pointer text-theme-light-text-primary dark:text-theme-dark-text-primary"
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
        {children}
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  dropdown: PropTypes.bool.isRequired,
  setDropdown: PropTypes.func.isRequired,
  color: PropTypes.string,
  children: PropTypes.element,
};
