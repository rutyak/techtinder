import { Link } from "react-router-dom";
import Login from "../auth/Auth";
import connectEdgeIcon from "../../assets/icons/connectEdgeIcon.svg";

function WelcomHeader({ isScrollingUp }) {
  return (
    <div className="fixed z-50 top-0 inset-0">
      <div
        data-testid="header"
        className={`relative ${
          isScrollingUp
            ? "bg-white/5 backdrop-blur-md backdrop-saturate-150"
            : ""
        }`}
      >
        <div className="flex items-center justify-between max-w-[1500px] mx-auto h-16 md:h-20 px-5 md:px-8 lg:px-16">
          <div className="flex items-center text-lg sm:text-xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 text-transparent bg-clip-text tracking-tight drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 mb-1 sm:mb-2 cursor-default">
            <img
              src={connectEdgeIcon}
              alt="connectEdgeIcon"
              className="h-8 w-8 md:h-12 md:w-12 lg:h-14 lg:w-14"
            />
            <span className="text-md md:text-[22px] lg:text-[28px]">ConnectEdge</span>
          </div>

          <div className="flex gap-8 items-center">
            <nav className="hidden md:flex items-end md:gap-8 lg:gap-14">
              <Link
                to="/"
                className="font-semibold text-base lg:text-lg text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                Services
              </Link>
              <Link
                to="/"
                className="font-semibold text-base lg:text-lg text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </nav>

            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomHeader;
