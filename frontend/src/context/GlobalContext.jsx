import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeUser } from "../utils/userSlice";
import { addRequests } from "../utils/requestsSlice";
import { addConnections } from "../utils/connectionsSlice";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [requestCount, setRequestCount] = useState(0);
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

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

  return (
    <GlobalContext.Provider
      value={{
        requestCount,
        setRequestCount,
        isChatWindowOpen,
        setIsChatWindowOpen,
        search,
        setSearch,
        getConnections,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalVariable = () => useContext(GlobalContext);
