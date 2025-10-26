import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Header from "../components/Header";
import { addConnections } from "../utils/connectionsSlice";
import { toast } from "react-toastify";
import { addRequests } from "../utils/requestsSlice";
import ChatList from "./chatpanel/ChatList";
import { removeUser } from "../utils/userSlice";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function Dashboard() {
  const userData = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData === null) {
      navigate("/");
    }
  }, []);

  async function getRequests() {
    try {
      const res = await axios.get(`${base_url}/user/requests`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data?.requests));
    } catch (error) {
      if (
        error.response?.data?.message === "jwt expired" ||
        error.response?.data?.message === "Please login"
      ) {
        if (!toast.isActive("authExpiredToast")) {
          toast.error("Please log in again.", {
            toastId: "authExpiredToast",
          });
        }
        dispatch(removeUser());
        navigate("/");
      }
      console.error(error);
    }
  }

  async function getConnections() {
    try {
      const res = await axios.get(`${base_url}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data?.data));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getConnections();
    getRequests();
  }, []);

  return (
    <div
      data-testid="dashboard"
      className="h-[100dvh] flex flex-col lg:flex-row items-center"
    >
      <div className="fixed z-50 w-full h-[65px] lg:h-screen lg:max-w-[340px] flex flex-col border-r border-gray-200">
        <Header />
        <div className="hidden lg:block">
          <ChatList />
        </div>
      </div>

      <div className="flex-1  lg:h-screen relative w-full sm:bg-gray-100 overflow-auto mt-[65px] lg:mt-0 lg:ml-[340px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
