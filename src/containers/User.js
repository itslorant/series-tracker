import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import Card from "../components/UI/Card/Card";
import Modal from "../components/UI/Modal/Modal";
import { Button, TextField } from "@mui/material";
import { Avatar } from "@mui/material";

export default function User() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
    console.log("name", name);
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

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onShowModal = () => {
    setShowModal(true);
  };

  const changePassword = () => {};

  console.log("render");
  const modal = (
    <Modal title="Password change" onClose={onCloseModal}>
      <TextField placeholder="Current password" />
      <TextField placeholder="New password" />
      <TextField placeholder="New password" />
      <Button onClick={changePassword} variant="contained">
        Change password
      </Button>
    </Modal>
  );

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

  return (
    <div style={{ width: "300px", margin: "auto", paddingTop: "60px" }}>
      <Card>
        <Avatar style={{ margin: "auto 0 auto auto" }}>{name.charAt(0)}</Avatar>
        {showModal && modal}
        {table}
        <Button variant="contained" onClick={updateUserName}>
          Update profile
        </Button>
        <Button variant="contained" onClick={onShowModal}>
          Change password
        </Button>
      </Card>
    </div>
  );
}
