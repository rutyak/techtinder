import { useEffect, useState } from "react";

function Herosection({ isScrollingUp, setIsScrollingUp }) {
  useEffect(() => {
    function handleScroll() {
      const currScrollPos = window.pageYOffset;

      if (currScrollPos > 80) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      data-testid="herosection-container"
      className={`h-[40vh] md:h-[60vh] lg:h-[90vh] flex flex-col items-center px-4 pt-32 md:pt-45 lg:pt-72 ${
        isScrollingUp ? "disappear-animation" : ""
      }`}
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl  lg:text-[80px] font-extrabold mb-4">
        <span className="text-white">Match. Connect. Hired.</span>
      </h1>

      <h2 className="text-sm md:text-md md:text-2xl font-light text-white max-w-2xl mx-auto">
        A networking platform where knowledge meets knowledge
      </h2>
    </div>
  );
}

export default Herosection;
