import React from "react";

import styles from "./Home.module.css";

const Home = ({ clicked }) => {
  return (
    <div className={styles.Home}>
      <h1 style={{ fontSize: "4.5rem", color: "rgba(126, 240, 255, 0.8)" }}>
        Battle
      </h1>
      <h1>Spaceships</h1>
      <div>
        <button onClick={() => clicked("create")}>Create Game</button>
        <button onClick={() => clicked("join")}>Join Game</button>
      </div>
    </div>
  );
};

export default Home;
