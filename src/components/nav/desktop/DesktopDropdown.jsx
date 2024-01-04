import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import DropdownSvg from "../../svg/action/dropdown/DropdownSvg";
import PropTypes from "prop-types";

export default function DesktopDropdown({
  data,
  path,
  dropdown,
  setDropdown,
  title,
  icon,
}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLink = (name) => {
    navigate(`/${path}?media=${name}&page=1`);
  };

  return (
    <li
      onMouseEnter={() => setDropdown(true)}
      className={`relative flex items-center gap-2
    ${
      location.pathname.includes(path) &&
      "text-theme-light-main dark:text-theme-dark-main"
    }`}
    >
      <div className="flex items-center gap-2">
        {icon} {title.toUpperCase()} <DropdownSvg />
      </div>
      {dropdown && (
        <div
          className="absolute right-0 top-8 z-50 flex h-fit w-24 flex-col rounded-md border-[1px] border-theme-light-bg-third bg-theme-light-bg-primary shadow-md dark:border-theme-dark-bg-third dark:bg-theme-dark-bg-secondary dark:shadow-none"
          onMouseLeave={() => setDropdown(false)}
        >
          {data.map((el) => (
            <button
              aria-disabled={searchParams.get("media") === el.name}
              type="button"
              key={el.id}
              onClick={() => handleLink(el.name)}
              className={`h-fit w-full border-t-[1px] border-theme-light-bg-third px-4 py-2 text-end first:border-none hover:bg-theme-light-bg-third dark:border-theme-dark-bg-third dark:hover:bg-theme-dark-bg-third ${
                (searchParams.get("media") === el.name &&
                  location.pathname.includes(path)) ||
                (location.pathname.includes(path) &&
                  location.pathname.includes(el.name))
                  ? "cursor-default text-theme-light-main dark:text-theme-dark-main"
                  : "text-theme-light-text-primary dark:text-theme-dark-text-primary"
              }`}
            >
              {el.title}
            </button>
          ))}
        </div>
      )}
    </li>
  );
}

DesktopDropdown.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  path: PropTypes.string.isRequired,
  dropdown: PropTypes.bool.isRequired,
  setDropdown: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
