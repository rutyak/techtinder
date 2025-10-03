import io from "socket.io-client";
const base_url = import.meta.env.VITE_APP_BACKEND_URL;

//connecting to backend
export const createSocketConnection = () => {
  return io(base_url, { withCredentials: true });
};
