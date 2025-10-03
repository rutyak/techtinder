import { IoMenuOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdPeopleAlt } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

function Sidebar() {
  return (
    <div
      data-testid="sidebar"
      className="w-14 h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 flex flex-col justify-between items-center py-6 border-indigo-950 shadow-xl"
    >
      <div className="flex flex-col items-center gap-8">
        <button className="p-2 rounded-lg bg-blue-700 transition-all duration-300 hover:scale-110">
          <IoMenuOutline className="text-xl text-white hover:text-white" />
        </button>

        <div className="flex flex-col items-center gap-8">
          <button className="p-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110">
            <LuMessageCircleMore className="text-xl text-blue-100 hover:text-white" />
          </button>

          <button className="p-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110">
            <MdPeopleAlt className="text-xl text-blue-100 hover:text-white" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        <button className="p-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110">
          <IoSettingsOutline className="text-xl text-blue-100 hover:text-white" />
        </button>

        <button className="relative p-2 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-110">
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-700"></div>
          <CgProfile className="text-xl text-blue-100 hover:text-white" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
