import React from "react";

const Home = ({ clicked }) => {
  return (
    <React.Fragment>
      <h1>BattleSpaceships</h1>
      <div>
        <button onClick={() => clicked("create")}>Create Game</button>
        <button onClick={() => clicked("join")}>Join Game</button>
      </div>
    </React.Fragment>
  );
};

export default Home;
