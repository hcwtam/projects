import React, { useState } from 'react';

import styles from './Homepage.module.css';
import Navbar from '../Navbar/Navbar';

import background1 from '../../assets/background1.jpg';
import background2 from '../../assets/background2.jpg';
import background3 from '../../assets/background3.jpg';
import background4 from '../../assets/background4.jpg';

enum themes {
  homepage1 = 'Homepage1',
  homepage2 = 'Homepage2',
  homepage3 = 'Homepage3',
  homepage4 = 'Homepage4'
}

const background = [background1, background2, background3, background4];

function Homepage(props) {
  const [theme, setTheme] = useState(0);
  const [themeColor, setThemeColor] = useState('Homepage1');
  const [white, setWhite] = useState(false);

  const themeHandler = () => {
    if (theme === 0) {
      setTheme((prev) => prev + 1);
      setWhite(true);
      setThemeColor(themes.homepage2);
    } else if (theme === 1) {
      setTheme((prev) => prev + 1);
      setWhite(true);
      setThemeColor(themes.homepage3);
    } else if (theme === 2) {
      setTheme((prev) => prev + 1);
      setWhite(false);
      setThemeColor(themes.homepage4);
    } else if (theme === 3) {
      setTheme(0);
      setWhite(false);
      setThemeColor(themes.homepage1);
    }
  };

  return (
    <>
      <Navbar white={white} />
      <div
        className={`${styles.Homepage} ${themeColor}`}
        onClick={themeHandler}
      >
        <div className={styles.Background}>
          <img src={background[theme]} alt="fruit" />
        </div>
        <div className={styles.Content}>
          <h1>For a healthier you</h1>
          <div>100% organic fruits.</div>
          <button
            className={`${themeColor}`}
            onClick={() => props.history.push('/shop')}
          >
            Shop now
            <span className="fa fa-chevron-right" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Homepage;
