import React, { ReactElement, useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import styles from './Navbar.module.css';
import { HomeIcon, ExploreIcon, HeartIcon } from '../../assets/svg/icons';
import ProfilePicture from '../shared/ProfilePicture/ProfilePicture';
import uploadIcon from '../../assets/uploadIcon.png';
import Upload from '../Upload/Upload';
import { userContext } from '../../store/user';

interface Props {
  avatarUrl: string;
}

export default function Navbar({ avatarUrl }: Props): ReactElement {
  const history = useHistory();
  const location = useLocation();
  const { username } = useContext(userContext);

  const [isActive, setIsActive] = useState<string>(location.pathname);

  return (
    <>
      <header className={styles.Navbar}>
        <div className={styles.Logo} onClick={() => history.push('/')}>
          Reactgram
        </div>
        <nav className={styles.Icons}>
          <Link
            to="/"
            onClick={() => setIsActive('/')}
            style={{ paddingLeft: 20 }}
          >
            <HomeIcon isActive={isActive === '/'} />
          </Link>
          <Link to="/" onClick={() => setIsActive('explore')}>
            <ExploreIcon isActive={isActive === 'explore'} />
          </Link>
          <div
            onClick={() => setIsActive('heart')}
            style={{ cursor: 'pointer' }}
          >
            <HeartIcon isActive={isActive === 'heart'} />
          </div>
          <div className={styles.Upload}>
            <img src={uploadIcon} alt="uploadIcon" />
            <Upload avatarUrl={avatarUrl} />
          </div>
          <div
            onClick={() => {
              setIsActive('/profile');
              history.push(`/${username}`);
            }}
            className={styles.Avatar}
          >
            {isActive === '/profile' ? <div className={styles.Active} /> : null}
            <ProfilePicture
              avatarUrl={avatarUrl}
              style={{ cursor: 'pointer', width: 20, height: 20 }}
            />
          </div>
          <div />
        </nav>
      </header>
    </>
  );
}
