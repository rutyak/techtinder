import axios from "axios";
import { createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

export const ConnectionsContext = createContext();

export function ConnectionsProvider({ children }) {
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
    <ConnectionsContext.Provider
      value={{
        getConnections,
      }}
    >
      {children}
    </ConnectionsContext.Provider>
  );
}

export const useConnectionsContext = () => useContext(ConnectionsContext);
