import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import DropdownSvg from "../../svg/action/dropdown/DropdownSvg";
import DropupSvg from "../../svg/action/dropdown/DropupSvg";
import PropTypes from "prop-types";

export default function MobileDropdown({
  data,
  path,
  setShowBurger,
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
    setShowBurger(false);
  };

  return (
    <li
      className="flex flex-col items-center justify-center gap-2"
      onClick={() => setDropdown(!dropdown)}
    >
      <div
        className={`flex items-center gap-2 ${
          location.pathname.includes(path) &&
          "text-theme-light-main dark:text-theme-dark-main"
        }`}
      >
        {icon}
        <p>{title.toUpperCase()}</p>{" "}
        {dropdown ? <DropupSvg /> : <DropdownSvg />}
      </div>
      {dropdown &&
        data &&
        data.map((el) => (
          <button
            type="button"
            key={el.id}
            onClick={() => handleLink(el.name)}
            className={`text-base ${
              searchParams.get("media") === el.name &&
              location.pathname.includes(path) &&
              "text-theme-light-main dark:text-theme-dark-main"
            }`}
          >
            {el.title.toUpperCase()}
          </button>
        ))}
    </li>
  );
}

MobileDropdown.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  path: PropTypes.string.isRequired,
  setShowBurger: PropTypes.func.isRequired,
  dropdown: PropTypes.bool.isRequired,
  setDropdown: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
