import axios from "axios";
import { useEffect, useRef } from "react";
import { FiUser, FiLogOut, FiUserPlus, FiLayers } from "react-icons/fi";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function Menu({ setIsOpenDropdown }) {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    function handleDropdownClose(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleDropdownClose);
    return () => document.removeEventListener("mousedown", handleDropdownClose);
  }, []);

  async function logout() {
    try {
      const res = await axios.post(
        `${base_url}/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  }

  function handleMenu() {
    setIsOpenDropdown(false);
  }

  return (
    <div className="w-full lg:h-screen lg:max-w-[340px] fixed inset-0 z-10 bg-black/5">
      <div
        ref={dropdownRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute w-full top-[55px] left-6 z-20 max-w-[200px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
      >
        <Link
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-all"
          to="/dashboard"
          onClick={handleMenu}
        >
          <FiLayers className="text-blue-500" />
          Feeds
        </Link>

        <Link
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-all"
          to="/dashboard/requests"
          onClick={handleMenu}
        >
          <FiUserPlus className="text-blue-500" />
          Requests
        </Link>

        <Link
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-all"
          to="/dashboard/profile"
          onClick={handleMenu}
        >
          <FiUser className="text-blue-500" />
          Profile
        </Link>

        <Link
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-all"
          to="/dashboard/premium"
          onClick={handleMenu}
        >
          <MdOutlineWorkspacePremium className="text-blue-500" />
          Premium
        </Link>

        <hr className="my-1 border-gray-200" />

        <button
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all"
          onClick={() => {
            logout();
            handleMenu();
          }}
        >
          <FiLogOut className="text-red-500" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Menu;
