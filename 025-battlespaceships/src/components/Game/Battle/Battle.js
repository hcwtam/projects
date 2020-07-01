import React, { useState } from "react";

import styles from "./Battle.module.css";
import Cell from "../Cell/Cell";

const Battle = ({ ids }) => {
  const [position, setPosition] = useState({});
  const [targetIds, setTargetIds] = useState(ids);
  const [hitIds, setHitIds] = useState([]);
  const [missedIds, setMissedIds] = useState([]);

  const hoverHandler = (x, y) => {
    // console.log("x:" + x, "y:" + y);
    setPosition({ x, y });
  };

  const selectedHandler = (x, y, id) => {
    if (x === position.x && y === position.y) {
      if (targetIds.includes(id)) {
        setTargetIds((prev) => prev.filter((el) => el !== id));
        setHitIds((prev) => prev.concat(id));
      } else {
        setMissedIds((prev) => prev.concat(id));
      }
    }
  };

  const cells = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      let id = y * 10 + x;
      cells.push(
        <Cell
          key={id}
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

  return targetIds.length ? (
    <div className={styles.Battle} onMouseLeave={hoverHandler}>
      {cells}
    </div>
  ) : (
    <div>You win!</div>
  );
};

export default Battle;
