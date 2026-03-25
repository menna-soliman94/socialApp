import React, { createContext, useContext, useEffect, useState } from "react";
import { getLoggedUserData } from "../services/userServices";
import { authContext } from "./AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext();

export default function UserContextProvider({ children }) {
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(authContext);

  async function getUserData() {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId");
      const { data } = await getLoggedUserData(userId);
      console.log(data);
      setUserData(data.user);
      console.log(data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);
  return (
    <userContext.Provider value={{ userData, isLoading }}>
      {children}
    </userContext.Provider>
  );
}
