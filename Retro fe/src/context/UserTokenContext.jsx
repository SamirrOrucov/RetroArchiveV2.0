import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

export const UserTokenContext = createContext();

function UserTokenContextProvider({ children }) {
  const [tokenn, setToken] = useState(
    Cookies.get("token") ? Cookies.get("token") : null
  );
  const [decodedToken, setDecodedToken] = useState(
    tokenn ? jwtDecode(tokenn) : null
  );

  function addToken(value) {
    setToken(value);
    const decoded = jwtDecode(value);
    setDecodedToken(decoded);
    Cookies.set("token", value, { expires: 7, secure: true });
  }

  function logout() {
    setToken(null);
    setDecodedToken(null);
    Cookies.remove("token");
  }
  // async function refreshAccessToken(refreshToken) {
  //   try {
  //     const response = await fetch("http://localhost:3003/refresh-token", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ tokenn }),
  //     });

  //     if (response.ok) {
  //       const { accessToken } = await response.json();
  //       addToken(accessToken); 
  //     } else {
  //       console.error("Failed to refresh access token:", response.statusText);
  //       logout(); 
  //     }
  //   } catch (error) {
  //     console.error("Error refreshing access token:", error);
  //     logout(); 
  //   }
  // }
  // useEffect(() => {
  //   const refreshToken = Cookies.get("refreshToken");
  //   if (tokenn && refreshToken) {
  //     refreshAccessToken(refreshToken);
  //   }
  // }, [tokenn]);
  return (
    <UserTokenContext.Provider
      value={{ decodedToken, logout, tokenn, addToken }}
    >
      {children}
    </UserTokenContext.Provider>
  );
}

export default UserTokenContextProvider;
