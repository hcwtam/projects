import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.css';
import { HomeIcon, ExploreIcon, HeartIcon } from '../../assets/svg/icons';

interface Props {}

export default function Navbar({}: Props): ReactElement {
  const [isActive, setIsActive] = useState<string>('/');

  return (
    <header className={styles.Navbar}>
      <div className={styles.Logo}>Reactgram</div>
      <nav className={styles.Icons}>
        <Link
          to="/"
          onClick={() => setIsActive('home')}
          style={{ paddingLeft: 20 }}
        >
          <HomeIcon isActive={isActive === 'home'} />
        </Link>
        <Link to="/" onClick={() => setIsActive('explore')}>
          <ExploreIcon isActive={isActive === 'explore'} />
        </Link>
        <div onClick={() => setIsActive('heart')} style={{ cursor: 'pointer' }}>
          <HeartIcon isActive={isActive === 'heart'} />
        </div>
      </nav>
    </header>
  );
}
