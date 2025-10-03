import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [requestCount, setRequestCount] = useState(0);
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        requestCount,
        setRequestCount,
        isChatWindowOpen,
        setIsChatWindowOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalVariable = () => useContext(GlobalContext);
