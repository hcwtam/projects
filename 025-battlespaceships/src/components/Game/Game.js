import React, { useState, useEffect } from "react";

import Setup from "./Setup/Setup";
import Battle from "./Battle/Battle";

const Game = () => {
  const [ids, setIds] = useState([]);

  const receiveIds = (idsArray) => {
    setIds(idsArray);
  };

  useEffect(() => {
    console.log(ids);
  }, [ids]);

  return (
    <div>{ids.length ? <Battle ids={ids} /> : <Setup send={receiveIds} />}</div>
  );
};

export default Game;
