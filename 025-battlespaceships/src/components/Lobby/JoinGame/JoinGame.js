import React, { useState, useEffect } from "react";
import firebase from "../../../firebase";

const JoinGame = ({ connected }) => {
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
    } else setErrorMessage(<div>Incorrect code, please try again</div>);
  };

  const submitHandler = () => {
    if (name && code) {
      uploadPlayer2();
    }
  };

  const beforeJoin = (
    <div>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="your name"
      ></input>
      <input
        type="text"
        onChange={(e) => setCode(e.target.value)}
        value={code}
        placeholder="code"
      ></input>
      <button onClick={submitHandler}>Join</button>
    </div>
  );

  return (
    <>
      {beforeJoin}
      {errorMessage}
    </>
  );
};

export default JoinGame;
