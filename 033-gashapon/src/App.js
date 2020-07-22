import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import Gashapon from './components/Gashapon/Gashapon';
import Collection from './components/Collection/Collection';
import Capsule from './components/Capsule/Capsule';

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images = importAll(
  require.context('./assets', false, /\.(png|jpe?g|svg|gif)$/)
);

function App() {
  const [showCard, setShowCard] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState(0);
  const [delay, setDelay] = useState('');
  const [store, setStore] = useState([
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17
  ]);

  // useEffect(() => {
  //   axios
  //     .get('https://ruru-gashapon.firebaseio.com/store.json')
  //     .then((result) => {
  //       setStore(result.data || []);
  //     });
  // }, []);

  // for reset

  useEffect(() => {
    axios.put('https://ruru-gashapon.firebaseio.com/store.json', store);
  }, [store]);

  const showCardHandler = (id) => {
    setShowCard((prev) => !prev);
    setSelectedCapsule(id);
  };

  const showCollectionHandler = () => {
    setShowCollection((prev) => !prev);
  };

  const drawHandler = () => {
    let randomNumber = Math.floor(Math.random() * store.length);
    if (store.length === 18) randomNumber = 0;
    setStore((prev) => prev.filter((el, i) => i !== randomNumber));
    axios.put(
      'https://ruru-gashapon.firebaseio.com/store.json',
      store.filter((el, i) => i !== randomNumber)
    );
    // console.log(store);
    return store[randomNumber];
  };

  return (
    <div className="App">
      {showCollection ? (
        <Collection
          toGashapon={showCollectionHandler}
          showHandler={(id) => {
            showCardHandler(id);
            setDelay('');
          }}
          store={store}
          images={images}
        />
      ) : (
        <Gashapon
          toCollection={showCollectionHandler}
          draw={() => {
            showCardHandler(drawHandler);
            setDelay('delay');
          }}
        />
      )}
      {showCard ? (
        <Capsule
          close={showCardHandler}
          images={images}
          displayId={selectedCapsule}
          delay={delay}
        />
      ) : null}
    </div>
  );
}

export default App;
