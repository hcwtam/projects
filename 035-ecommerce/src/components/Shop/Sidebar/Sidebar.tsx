import React, { useState } from 'react';

import styles from './Sidebar.module.css';
import all from '../../../assets/all.svg';
import favourites from '../../../assets/favourites.svg';
import citrus from '../../../assets/citrus.svg';
import berries from '../../../assets/berries.svg';
import melons from '../../../assets/melons.svg';
import exotic from '../../../assets/exotic.svg';

const categories = [
  { all },
  { favourites },
  { citrus },
  { berries },
  { melons },
  { exotic }
];

function Sidebar({ setActive }) {
  const [bold, setBold] = useState(0);

  const lists = categories.map((list, i) => {
    for (let key in list) {
      const value = list[key];

      return (
        <li
          key={i}
          className={bold === i ? styles.active : null}
          onClick={() => {
            setActive(key);
            setBold(i);
          }}
        >
          <img src={value} alt={`${key}`} />{' '}
          {`${key[0].toUpperCase() + key.slice(1)}`}
        </li>
      );
    }
    return null;
  });

  return (
    <ul className={styles.Sidebar}>
      <h4>Categories</h4>
      {lists}
    </ul>
  );
}

export default Sidebar;
