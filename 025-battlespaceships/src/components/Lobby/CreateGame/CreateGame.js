import React, { useState, useEffect } from "react";
import firebase from "../../../firebase";

const code = Math.random().toString().substring(2, 8);

const CreateGame = ({ connected }) => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection("games").onSnapshot((snapshot) => {
      const gamesData = [];
      snapshot.forEach((doc) => gamesData.push(doc.data()));
      console.log(gamesData);
      if (gamesData.length) {
        for (let game of gamesData) {
          if (game.code === code && game.player2) {
            console.log(game.code, game.player2);
            connected("player1", "player2", code);
          }
        }
      }
    });
    // check database code, if match with current code and player2 exists, connects with opponent
    return unsubscribe;
  }, [connected]);

  const uploadPlayer1 = () => {
    const db = firebase.firestore();
    db.collection("games").doc(code).set({ player1: name, code });
  };

  const changeHandler = (e) => setName(e.target.value);

  const submitHandler = () => {
    if (name) {
      setSubmitted(true);
      uploadPlayer1();
    }
  };

  const beforeSubmit = (
    <div>
      <input type="text" onChange={changeHandler} value={name}></input>
      <button onClick={submitHandler}>create</button>
    </div>
  );

  const afterSubmit = (
    <div>
      <div>Waiting for opponent to join</div>
      <div>{code}</div>
    </div>
  );

  return submitted ? afterSubmit : beforeSubmit;
};

export default CreateGame;
