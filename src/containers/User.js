import axios from "axios";
import React, { useEffect, useMemo, useState, useCallback } from "react";

import Card from "../components/UI/Card/Card";
import Modal from "../components/UI/Modal/Modal";
import { Button, TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import ChangePassword from "../components/User/ChangePassword/ChangePassword";

export default function User() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
      process.env.REACT_APP_WEB_API_KEY;
    const userToken = localStorage.getItem("token");
    axios
      .post(url, { idToken: userToken })
      .then((response) => {
        console.log(response.data.users[0]);
        const userData = response.data.users[0];
        setName(userData.displayName);
        setEmail(userData.email);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateUserName = () => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
      process.env.REACT_APP_WEB_API_KEY;

    const userToken = localStorage.getItem("token");
    const payload = {
      idToken: userToken,
      displayName: name,
    };
    axios
      .post(url, payload)
      .then((response) => {
        setName(response.data.users[0].displayName);
      })
      .catch((error) => console.log(error));
  };

  const onShowPasswordChange = () => {
    setShowPasswordChange(true);
  };

  const onHidePasswordChange = () => {
    setShowPasswordChange(false);
  };

  const setNewPassword = (password) => {
    if (password) {
       const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
      process.env.REACT_APP_WEB_API_KEY;
    const userToken = localStorage.getItem("token");
    const payload = {
      idToken: userToken,
      password: password,
      returnSecureToken:true
    };
    axios
      .post(url, payload)
      .then((response) => {
        console.log(response)
        setResponseMessage('Password changed succesfully!')
        setShowModal(true);
      })
      .catch((error) => console.log(error));
    }
  };

  const onCloseModal = () =>{
    setShowModal(false);
  }

  const table = (
    <table>
      <tbody>
        <tr>
          <td>Name:</td>
          <td>
            <TextField
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              size="small"
            />
          </td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>
            <TextField
              value={email}
              placeholder="Enter your new email"
              onChange={(e) => setEmail(e.target.value)}
              size="small"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );

  const changePassword = (
    <ChangePassword
      onClose={onHidePasswordChange}
      newPassword={(password) => setNewPassword(password)}
    />
  );


  const message = (<Modal title="Message" onClose={onCloseModal}>{responseMessage}</Modal>)

  console.log("render");

  return (
    <div style={{ width: "300px", margin: "auto", paddingTop: "60px" }}>
      {showPasswordChange && changePassword}
      {showModal && message}
      <Card>
        <Avatar style={{ margin: "auto 0 auto auto" }}>{name.charAt(0)}</Avatar>
        {table}
        <Button variant="contained" onClick={updateUserName}>
          Update profile
        </Button>
        <Button variant="contained" onClick={onShowPasswordChange}>
          Change password
        </Button>
      </Card>
    </div>
  );
}
