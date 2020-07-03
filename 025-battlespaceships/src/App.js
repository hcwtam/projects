import React, { useState, useCallback } from "react";

import "./App.css";
import Game from "./components/Game/Game";
import Lobby from "./components/Lobby/Lobby";

export const PlayersContext = React.createContext();

function App() {
  const [ready, setReady] = useState();
  const [me, setMe] = useState();
  const [opponent, setOpponent] = useState();
  const [code, setCode] = useState();

  const whenReady = useCallback((meString, opponentString, receivedCode) => {
    setReady(true);
    setMe(meString);
    setOpponent(opponentString);
    setCode(receivedCode);
  }, []);

  return (
    <div className="App">
      <PlayersContext.Provider value={[me, opponent]}>
        {ready ? (
          <Game code={code} me={me} opponent={opponent} />
        ) : (
          <Lobby connected={whenReady} />
        )}
      </PlayersContext.Provider>
    </div>
  );
}

export default App;
