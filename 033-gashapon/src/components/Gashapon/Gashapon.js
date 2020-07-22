import React, { useState } from 'react';

import styles from './Gashapon.module.css';
import './Gashapon.css';

const Gashapon = ({ draw, toCollection }) => {
  const [active, setActive] = useState('');
  const randomColor = Math.ceil(Math.random() * 5);

  const drawHandler = () => {
    setActive('active');
    draw();
    setTimeout(() => {
      setActive('');
    }, 2000);
  };

  const balls = [];

  for (let i = 0; i < 21; i++) {
    balls.push(<div key={i} className={`ball ${active} ball${i + 1}`} />);
  }

  return (
    <>
      <div className={styles.collection} onClick={toCollection}>
        <i className="fas fa-book"></i>
      </div>
      <div className="Gashapon">
        <div className="machineTop">{balls}</div>
        <div className="machineBottom">
          <div className={`spin ${active}`} onClick={drawHandler} />
        </div>
        <div className="machineBase" />
        <div className="exit">
          <div className={`chosenBall ${active} color${randomColor}`} />
        </div>
      </div>
    </>
  );
};

export default Gashapon;
