import React, { useState } from "react";

import Modal from "../../UI/Modal/Modal";
import { TextField, Button } from "@mui/material";

export default function ChangePassword(props) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const changePassword = (e) => {
      e.preventDefault();
    if (newPassword === confirmPassword) {
      props.newPassword( newPassword);
      props.onClose();
    } else {
      setError("Passwords are not matching!");
    }
  };

  return (
    <Modal title="Password change" onClose={props.onClose}>
      {error}
      <form onSubmit={changePassword}>
        <TextField
          required
          label="New password"
          placeholder="New password"
          size="small"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          required
          label="Password confirm"
          placeholder="Password confirm"
          size="small"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Change password
        </Button>
      </form>
    </Modal>
  );
}
