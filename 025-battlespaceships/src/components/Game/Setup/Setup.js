import React, { useState, useContext, useEffect } from "react";

import styles from "./Setup.module.css";
import Cell from "../Cell/Cell";
import { ship1, ship2, ship3, ship4, ship5 } from "../../../lib/ships/ships";
import { PlayersContext } from "../../../App";

const Setup = ({ send }) => {
  const [position, setPosition] = useState({});
  const [selected, setSelected] = useState([]);
  const [ship, setShip] = useState(1);
  const [rotation, setRotation] = useState(0);

  const [me, opponent] = useContext(PlayersContext);

  // send position ids to Game when all ships are placed
  useEffect(() => {
    if (ship > 5) setTimeout(() => send(selected), 1000);
  }, [ship, selected, send]);

  // Check current position of cursor
  const hoverHandler = (x, y) => {
    // console.log("x:" + x, "y:" + y);
    setPosition({ x, y });
  };

  const rotationHandler = () => {
    setRotation((prev) => (prev === 3 ? 0 : prev + 1));
  };

  const selectedHandler = (x, y) => {
    let idsArray = [];
    if (x === position.x && y === position.y) {
      switch (ship) {
        case 1:
          idsArray = ship1(x, y, rotation, selected);
          break;
        case 2:
          idsArray = ship2(x, y, rotation, selected);
          break;
        case 3:
          idsArray = ship3(x, y, rotation, selected);
          break;
        case 4:
          idsArray = ship4(x, y, rotation, selected);
          break;
        case 5:
          idsArray = ship5(x, y, rotation, selected);
          break;
        default:
          console.log("end");
          break;
      }
    }
    if (!idsArray.some((el) => selected.includes(el))) {
      setSelected((prev) => prev.concat(idsArray));
      // console.log(idsArray.length);
      if (idsArray.length) setShip((prev) => prev + 1);
    }
  };

  //   useEffect(() => console.log(rotation), [rotation]);

  // Set up cells on board
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
          clicked={() => selectedHandler(x, y)}
          selected={selected.includes(id)}
        />
      );
    }
  }

  return (
    <div className={styles.Setup} onMouseLeave={hoverHandler}>
      {cells}
      <button onClick={rotationHandler}>rotate</button>
      <div>{me}</div>
    </div>
  );
};

export default Setup;
