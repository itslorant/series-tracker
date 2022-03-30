import React, { useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
  logout: () => {},
  checkAuthState: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = (email, password) => {
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
      })
      .catch((error) => {
        console.log(error);
      });

    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const checkAuthState = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      logout();
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        logout();
      } else {
        setIsAuthenticated(true);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuthenticated,
        login: loginHandler,
        logout: logout,
        checkAuth: checkAuthState,
      }}
      {...props}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
