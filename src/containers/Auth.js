import React, { useContext, useEffect, useState } from "react";

import Card from "./../components/UI/Card/Card";
import { AuthContext } from "../context/auth-context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "../components/UI/Modal/Modal";
import style from "./Auth.module.css";

const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const authContext = useContext(AuthContext);
  const loginHandler = (e) => {
    e.preventDefault();
    authContext.login(email, password);
  };

  useEffect(() => {
    if (authContext.error) setShowModal(true);
  }, [authContext.error]);

  const onCloseModal = () => {
    setShowModal(false);
    authContext.clear();
  };
  const modal = (
    <Modal title="Error in login!" onClose={onCloseModal}>
      <p> Your username or password is invalid!</p>
      <Button
        className={style.Button}
        variant="contained"
        onClick={() => onCloseModal()}
      >
        Close
      </Button>
    </Modal>
  );
  return (
    <div className={style.Auth}>
      {showModal && modal}
      <Card>
        <form onSubmit={loginHandler}>
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
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
