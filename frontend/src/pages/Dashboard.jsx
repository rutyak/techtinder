import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Header from "../components/Header";
import { addConnections } from "../utils/connectionsSlice";
import { toast } from "react-toastify";
import { addRequests } from "../utils/requestsSlice";
import ChatList from "./chatpanel/ChatList";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function Dashboard() {
  const dispatch = useDispatch();

  async function getRequests() {
    try {
      const res = await axios.get(`${base_url}/user/requests`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data?.requests));
    } catch (error) {
      if (!toast.isActive("requestsErrorToast")) {
        toast.error(error.data?.message || "Internal server error", {
          toastId: "requestsErrorToast",
        });
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
      if (!toast.isActive("connectionErrorToast")) {
        toast.error(error.data?.message || "Internal server error", {
          toastId: "connectionErrorToast",
        });
      }

      consol.error(error);
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

      <div className="flex-1  lg:min-h-screen relative w-full sm:bg-gray-100 overflow-auto mt-[65px] lg:mt-0 lg:ml-[340px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
