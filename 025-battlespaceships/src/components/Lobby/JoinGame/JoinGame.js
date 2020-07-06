import React, { useState, useEffect } from "react";
import firebase from "../../../firebase";

import Return from "../Return/Return";

const JoinGame = ({ connected, clicked }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [games, setGames] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection("games").onSnapshot((snapshot) => {
      const gamesData = [];
      snapshot.forEach((doc) => gamesData.push(doc.data()));
      setGames(gamesData);
      console.log(gamesData);
    });
    return unsubscribe;
  }, []);

  const uploadPlayer2 = () => {
    const db = firebase.firestore();
    const player1 = games.filter((el) => el.code === code);
    console.log(player1);
    if (player1.length) {
      db.collection("games")
        .doc(code)
        .set({ ...player1[0], player2: name });
      connected("player2", "player1", code);
    } else
      setErrorMessage(
        <div
          style={{
            position: "relative",
            top: -10,
            left: -90,
            marginTop: -19,
            fontSize: "0.9rem",
            color: "rgb(255, 95, 95)",
          }}
        >
          Invalid code, please try again
        </div>
      );
  };

  const submitHandler = () => {
    if (name && code) {
      uploadPlayer2();
    }
  };

  const beforeJoin = (
    <div>
      <label>join game</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Choose a name"
        autoFocus
      ></input>
      <input
        type="text"
        onChange={(e) => setCode(e.target.value)}
        value={code}
        placeholder="Game code"
      ></input>
      {errorMessage}
      <button onClick={submitHandler}>Join</button>
    </div>
  );

  return (
    <>
      {beforeJoin}
      <Return clicked={clicked} />
    </>
  );
};

export default JoinGame;
