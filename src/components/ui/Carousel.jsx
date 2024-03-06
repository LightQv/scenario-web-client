import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function Carousel({
  children,
  leftPosition,
  rightPosition,
  containerHeight,
  btnHeight,
  btnWidth,
  textSize,
  leftScrollLength,
  rightScrollLength,
}) {
  const carouselRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollMax, setScrollMax] = useState(false);
  const location = useLocation();

  //--- Reset Scroll Position on new Render ---//
  useEffect(() => {
    carouselRef.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  //--- Handle Slide function ---//
  const handleSlide = (direction) => {
    const slider = carouselRef?.current;
    if (direction === "left") {
      slider.scrollBy({
        top: 0,
        left: leftScrollLength,
        behavior: "smooth",
      });
    } else {
      slider.scrollBy({
        top: 0,
        left: rightScrollLength,
        behavior: "smooth",
      });
    }
  };

  //--- Calculate distance between left & right to hide scroll Buttons ---//
  const handleScroll = (e) => {
    const target = e.target;
    const endOfElement =
      target.scrollWidth - target.scrollLeft === target.clientWidth;
    if (endOfElement) {
      setScrollMax(true);
    } else setScrollMax(false);
    setScrollPosition(target.scrollLeft);
  };

  return (
    <ul
      className="grid snap-x auto-cols-max grid-flow-col gap-2 overflow-x-scroll overscroll-contain px-5 pb-2 scrollbar-none lg:px-0"
      ref={carouselRef}
      onScroll={handleScroll}
    >
      {/* Carousel Slides */}
      {children}
      {/* Carousel Btn Left */}
      <div
        className={`${
          scrollPosition !== 0 ? "w-32 opacity-100" : "w-0 opacity-0"
        } ${leftPosition} z-30 ${containerHeight} hidden items-center justify-start bg-gradient-to-r from-theme-light-bg-opacity via-theme-light-bg-opacity via-60% to-transparent transition-all duration-1000 lg:absolute lg:flex dark:from-theme-dark-bg-opacity dark:via-theme-dark-bg-opacity`}
      >
        <button
          type="button"
          onClick={() => handleSlide("left")}
          className={`rounded-md bg-theme-light-bg-third ${textSize} transition-all hover:bg-theme-light-bg-quad dark:bg-theme-dark-bg-third dark:hover:bg-theme-dark-bg-quad ${btnHeight} ${btnWidth}`}
        >
          &lt;
        </button>
      </div>
      {/* Carousel Btn Right */}
      <div
        className={`${
          !scrollMax ? "w-32 opacity-100" : "w-0 opacity-0"
        } ${rightPosition} z-30 hidden ${containerHeight} items-center justify-end bg-gradient-to-l from-theme-light-bg-opacity via-theme-light-bg-opacity via-60% to-transparent transition-all duration-1000 lg:absolute lg:flex dark:from-theme-dark-bg-opacity dark:via-theme-dark-bg-opacity`}
      >
        <button
          type="button"
          onClick={() => handleSlide("right")}
          className={`rounded-md bg-theme-light-bg-third ${textSize} transition-all hover:bg-theme-light-bg-quad dark:bg-theme-dark-bg-third dark:hover:bg-theme-dark-bg-quad ${btnHeight} ${btnWidth}`}
        >
          &gt;
        </button>
      </div>
    </ul>
  );
}

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()),
  leftPosition: PropTypes.string.isRequired,
  rightPosition: PropTypes.string.isRequired,
  containerHeight: PropTypes.string.isRequired,
  btnHeight: PropTypes.string.isRequired,
  btnWidth: PropTypes.string.isRequired,
  textSize: PropTypes.string.isRequired,
  leftScrollLength: PropTypes.number.isRequired,
  rightScrollLength: PropTypes.number.isRequired,
};
