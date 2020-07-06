import React, { useState, useEffect } from "react";

import styles from "./Battle.module.css";
import Cell from "../Cell/Cell";

const Battle = ({
  targetIds,
  hitIds,
  missedIds,
  myIds,
  myHitIds,
  myMissedIds,
  turn,
  me,
  opponent,
  hitOrMiss,
}) => {
  const [position, setPosition] = useState({});
  const [disconnect, setDisconnect] = useState(false);

  useEffect(() => {
    if (turn === opponent) {
      const timer = setTimeout(() => setDisconnect(true), 60000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setDisconnect(true), 60000);
      return () => clearTimeout(timer);
    }
  }, [turn, opponent]);

  const hoverHandler = (x, y) => {
    // console.log("x:" + x, "y:" + y);
    setPosition({ x, y });
  };

  const selectedHandler = (x, y, id) => {
    if (x === position.x && y === position.y && turn === me) {
      hitOrMiss(id, opponent);
    }
  };

  const myBoard = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      let id = y * 10 + x;
      myBoard.push(
        <Cell
          key={`${id}me`}
          x={x}
          y={y}
          id={id}
          hovered={() => hoverHandler(x, y)}
          clicked={() => selectedHandler(x, y, id)}
          missed={missedIds.includes(id)}
          destroyed={hitIds.includes(id)}
        />
      );
    }
  }

  const opponentBoard = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      let id = y * 10 + x;
      opponentBoard.push(
        <Cell
          key={`${id}op`}
          x={x}
          y={y}
          id={id}
          selected={myIds.includes(id)}
          missed={myMissedIds.includes(id)}
          destroyed={myHitIds.includes(id)}
        />
      );
    }
  }

  let page;
  if (targetIds.length) {
    if (myIds.length) {
      page = (
        <div className={styles.Battle}>
          <div className={styles.Me} onMouseLeave={hoverHandler}>
            {myBoard}
            <div>{me}</div>
          </div>
          <div className={styles.Opponent} onMouseLeave={hoverHandler}>
            {opponentBoard}
            <div>{opponent}</div>
          </div>
          <div>Turn: {turn}</div>
        </div>
      );
    } else {
      page = <div>You lose!</div>;
    }
  } else {
    page = <div>You win!</div>;
  }

  if (disconnect) page = <div>Game is disconnected :(</div>;

  return page;
};

export default Battle;
