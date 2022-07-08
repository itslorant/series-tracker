import React, { useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
  logout: () => {},
  checkAuthState: () => {},
  clear: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const clear = () => setError(null);

  const loginHandler = (email, password, keepLoggedIn) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      process.env.REACT_APP_WEB_API_KEY;
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("keepLoggedIn", keepLoggedIn);
        if (keepLoggedIn) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }

        setIsAuthenticated(true);
      })
      .catch((error) => {
        setError(error.response.data.error.message);
        setIsAuthenticated(false);
      });
  };

  const refreshTokenHandler = () => {
    const url =
      "https://securetoken.googleapis.com/v1/token?key=" +
      process.env.REACT_APP_WEB_API_KEY;

    const refreshToken = localStorage.getItem("refreshToken");
    const keepLoggedIn = localStorage.getItem("keepLoggedIn");

    const payload = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };

    axios
      .post(url, payload)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expires_in * 1000
        );
        localStorage.setItem("token", response.data.id_token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.user_id);
        if (keepLoggedIn) {
          localStorage.setItem("refreshToken", response.data.refresh_token);
        }
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setError(error.response.data.error.message);
        setIsAuthenticated(false);
      });
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const checkAuthState = () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token && !refreshToken) {
      logout();
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));

      if (expirationDate <= new Date()) {
        if (refreshToken) {
          refreshTokenHandler();
        } else {
          logout();
        }
      } else {
        setIsAuthenticated(true);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuthenticated,
        error: error,
        login: loginHandler,
        logout: logout,
        checkAuth: checkAuthState,
        clear: clear,
      }}
      {...props}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
