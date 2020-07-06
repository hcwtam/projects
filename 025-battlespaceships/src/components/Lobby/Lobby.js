import React, { useState } from "react";

import styles from "./Lobby.module.css";
import Home from "./Home/Home";
import CreateGame from "./CreateGame/CreateGame";
import JoinGame from "./JoinGame/JoinGame";

const Lobby = ({ connected }) => {
  const [currentPage, setCurrentPage] = useState("home");

  const pageHandler = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.Lobby}>
      {currentPage === "home" ? (
        <Home clicked={pageHandler} />
      ) : currentPage === "create" ? (
        <CreateGame clicked={pageHandler} connected={connected} />
      ) : (
        <JoinGame clicked={pageHandler} connected={connected} />
      )}
    </div>
  );
};

export default Lobby;
