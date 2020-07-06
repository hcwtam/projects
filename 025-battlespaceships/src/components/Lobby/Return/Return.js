import React from "react";

import styles from "./Return.module.css";

const Return = ({ clicked }) => {
  return (
    <div className={styles.Return} onClick={() => clicked("home")}>
      <i className="fa fa-arrow-left" aria-hidden="true"></i>
    </div>
  );
};

export default Return;
