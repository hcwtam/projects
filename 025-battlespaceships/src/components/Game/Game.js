import React, { useState, useEffect } from "react";
import firebase from "../../firebase";

import Setup from "./Setup/Setup";
import Battle from "./Battle/Battle";

const Game = ({ code, me, opponent }) => {
  const [setupDone, setSetupDone] = useState(false);
  const [targetIds, setTargetIds] = useState([]);
  const [hitIds, setHitIds] = useState([]);
  const [missedIds, setMissedIds] = useState([]);
  // ids start with 'my' is changed by opponent's choices
  const [myIds, setMyIds] = useState([]);
  const [myHitIds, setMyHitIds] = useState([]);
  const [myMissedIds, setMyMissedIds] = useState([]);
  const [turn, setTurn] = useState("player1");
  const [data, setData] = useState({});

  // upload my ids to db after my setup, and pre-upload empty arrays for missed and hit ids
  const receiveIds = (idsArray) => {
    const db = firebase.firestore();
    db.collection("games")
      .doc(code)
      .set({
        ...data,
        [`${me}Ids`]: idsArray,
        [`${me}Hit${opponent}Ids`]: [],
        [`${me}Missed${opponent}Ids`]: [],
        turn: "player1",
        disconnect: false,
      });
  };

  // opponent loses one ID, and I hit one. upload to db
  const updateHitIds = (opponentIds, meHitOpponentIds, player) => {
    const db = firebase.firestore();
    db.collection("games")
      .doc(code)
      .set({
        ...data,
        [`${opponent}Ids`]: opponentIds,
        [`${me}Hit${opponent}Ids`]: meHitOpponentIds,
        turn: player,
      });
  };

  const updateMissedIds = (meMissedOpponentIds, player) => {
    const db = firebase.firestore();
    db.collection("games")
      .doc(code)
      .set({
        ...data,
        [`${me}Missed${opponent}Ids`]: meMissedOpponentIds,
        turn: player,
      });
  };

  // update my board (guessing opponent's ship positions)
  const hitOrMissHandler = (id, player) => {
    // a check to prevent clicking 'clicked' cells
    if (!hitIds.includes(id) && !missedIds.includes(id)) {
      if (targetIds.includes(id)) {
        setTargetIds((prev) => prev.filter((el) => el !== id));
        setHitIds((prev) => prev.concat(id));
        updateHitIds(
          targetIds.filter((el) => el !== id),
          hitIds.concat(id),
          player
        );
      } else {
        setMissedIds((prev) => prev.concat(id));
        updateMissedIds(missedIds.concat(id), player);
      }
    }
  };

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection("games").onSnapshot((snapshot) => {
      const gamesData = [];
      snapshot.forEach((doc) => gamesData.push(doc.data()));
      const gameData = gamesData.filter((el) => el.code === code)[0];
      setData(gameData);
      // opponent ids for me to hit
      if (gameData[`${opponent}Ids`]) setTargetIds(gameData[`${opponent}Ids`]);
      // my ids including ship positions, hit ids and missed ids (by opponent)
      if (gameData[`${me}Ids`]) setMyIds(gameData[`${me}Ids`]);
      if (gameData[`${opponent}Hit${me}Ids`])
        setMyHitIds(gameData[`${opponent}Hit${me}Ids`]);
      if (gameData[`${opponent}Missed${me}Ids`])
        setMyMissedIds(gameData[`${opponent}Missed${me}Ids`]);
      if (gameData.turn) setTurn(gameData.turn);
      console.log(gameData);
    });
    return unsubscribe;
  }, [code, me, opponent]);

  // check at setup stage, if both player 1 and 2 have finished setup
  if (!setupDone && data[`${me}Ids`] && data[`${opponent}Ids`]) {
    setSetupDone(true);
  }

  return (
    <div>
      {setupDone ? (
        <Battle
          targetIds={targetIds}
          hitIds={hitIds}
          missedIds={missedIds}
          myIds={myIds}
          myHitIds={myHitIds}
          myMissedIds={myMissedIds}
          turn={turn}
          me={me}
          opponent={opponent}
          data={data}
          hitOrMiss={hitOrMissHandler}
        />
      ) : (
        <Setup send={receiveIds} />
      )}
    </div>
  );
};

export default Game;
