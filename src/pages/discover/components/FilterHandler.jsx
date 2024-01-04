import MobileFilterBar from "./mobile/MobileFilterBar";
import DesktopFilterBar from "./desktop/DesktopFilterBar";
import { useWindowSize } from "../../../hooks/useWindowSize";
import PropTypes from "prop-types";

export default function FilterHandler({
  scrollTop,
  showFilter,
  setShowFilter,
}) {
  const [clientWidth] = useWindowSize();

  return (
    <>
      {clientWidth >= 1024 ? (
        <DesktopFilterBar />
      ) : (
        <MobileFilterBar
          scrollTop={scrollTop}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />
      )}
    </>
  );
}

FilterHandler.propTypes = {
  scrollTop: PropTypes.number.isRequired,
  showFilter: PropTypes.bool.isRequired,
  setShowFilter: PropTypes.func.isRequired,
};
