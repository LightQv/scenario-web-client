import NavDesktop from "./desktop/NavDesktop";
import NavMobile from "./mobile/NavMobile";
import { useWindowSize } from "../../hooks/useWindowSize";
import PropTypes from "prop-types";

export default function NavHandler({
  setShowSearch,
  showBurger,
  setShowBurger,
  setShowAuth,
}) {
  const [clientWidth] = useWindowSize();

  return (
    <>
      {clientWidth >= 1024 ? (
        <NavDesktop setShowSearch={setShowSearch} setShowAuth={setShowAuth} />
      ) : (
        <NavMobile
          setShowSearch={setShowSearch}
          showBurger={showBurger}
          setShowBurger={setShowBurger}
          setShowAuth={setShowAuth}
        />
      )}
    </>
  );
}

NavHandler.propTypes = {
  setShowSearch: PropTypes.func.isRequired,
  showBurger: PropTypes.bool.isRequired,
  setShowBurger: PropTypes.func.isRequired,
  setShowAuth: PropTypes.func.isRequired,
};
