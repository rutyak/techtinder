import { useState } from "react";
import { createContext, useContext } from "react";

export const RequestsContext = createContext();

export function RequestsProvider({ children }) {
  const [requestCount, setRequestCount] = useState(0);

  return (
    <RequestsContext.Provider value={{ requestCount, setRequestCount }}>
      {children}
    </RequestsContext.Provider>
  );
}

export const useRequestsContext = () => useContext(RequestsContext);
