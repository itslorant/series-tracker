import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";

import Series from "./containers/Series";
import Auth from "./containers/Auth";
import User from "./containers/User";
import { AuthContext } from "./context/auth-context";

function App() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.checkAuth();
  }, [authContext]);

  let content = <Auth />;
  if (authContext.isAuth) {
    content = <Series />;
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={content} />
        <Route path="me" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
