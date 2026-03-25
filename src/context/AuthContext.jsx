import React, { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext();
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
