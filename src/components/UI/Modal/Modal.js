import React from "react";

import style from "./Modal.module.css";

const Modal = React.memo((props) => {
  return (
    <React.Fragment>
      <div className={style.Backdrop} onClick={props.onClose} />
      <div className={style.Modal}>
        <h2>{props.title}</h2>
        <div>{props.children}</div>
      </div>
    </React.Fragment>
  );
});

export default Modal;
