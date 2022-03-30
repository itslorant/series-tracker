import React, { useContext, useState } from "react";

import Card from "./../components/UI/Card/Card";
import { AuthContext } from "../context/auth-context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import style from "./Auth.module.css";

const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);
  const loginHandler = (email, password) => {
    authContext.login(email, password);
  };

  return (
    <div className={style.Auth}>
      <Card>
        <h2>Please log in to continue!</h2>

        <TextField
          className={style.InputField}
          label="E-mail"
          type="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          size="small"
        />
        <div className={style.Placeholder}></div>
        <TextField
          className={style.InputField}
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          size="small"
        />
        <div className={style.Placeholder}></div>
        <Button
          className={style.Button}
          variant="contained"
          onClick={() => loginHandler(email, password)}
        >
          Submit
        </Button>
      </Card>
    </div>
  );
};

export default Auth;
