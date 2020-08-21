import React, { ReactElement, useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

import styles from './Navbar.module.css';
import {
  HomeIcon,
  ExploreIcon,
  HeartIcon,
  UserIcon,
  UserSavedIcon,
  UserSettingsIcon
} from '../../assets/svg/icons';
import ProfilePicture from '../shared/ProfilePicture/ProfilePicture';
import uploadIcon from '../../assets/uploadIcon.png';
import Upload from '../Upload/Upload';
import { userContext } from '../../store/user';
import { logout } from '../../utils/auth';
import { authContext } from '../../store/auth';

interface Props {
  avatarUrl: string;
}

export default function Navbar({ avatarUrl }: Props): ReactElement {
  const history = useHistory();
  const location = useLocation();
  const { username } = useContext(userContext);

  const [isActive, setIsActive] = useState<string>(location.pathname);
  const [showTippy, setShowTippy] = useState<boolean>(false);

  const { setToken, setUserId } = useContext(authContext);

  return (
    <>
      <header className={styles.Header}>
        <div className={styles.Navbar}>
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
                setIsActive(`/${username}`);
                setShowTippy(true);
              }}
              className={styles.Avatar}
            >
              <Tippy
                interactive
                theme="light-border"
                className={styles.Tippy}
                content={
                  <div className={styles.UserOptions}>
                    <div
                      className={styles.UserOption}
                      onClick={() => {
                        history.push(`/${username}`);
                      }}
                    >
                      <UserIcon />
                      <span>Profile</span>
                    </div>
                    <div
                      className={styles.UserOption}
                      onClick={() => {
                        history.push({
                          pathname: `/${username}`,
                          state: { initToSaved: true }
                        });
                      }}
                    >
                      <UserSavedIcon />
                      <span>Saved</span>
                    </div>
                    <div
                      className={styles.UserOption}
                      onClick={() => {
                        history.push(`/settings`);
                      }}
                    >
                      <UserSettingsIcon />
                      <span>Settings</span>
                    </div>
                    <div
                      className={styles.Logout}
                      onClick={() => {
                        logout();
                        setToken('');
                        setUserId('');
                      }}
                    >
                      Log Out
                    </div>
                  </div>
                }
                visible={showTippy}
                onClickOutside={() => {
                  setShowTippy(false);
                  setIsActive(location.pathname);
                }}
              >
                <div>
                  <ProfilePicture
                    avatarUrl={avatarUrl}
                    style={{ cursor: 'pointer', width: 20, height: 20 }}
                  />
                </div>
              </Tippy>
              {isActive === `/${username}` ? (
                <div className={styles.Active} />
              ) : null}
            </div>
            <div />
          </nav>
        </div>
      </header>
    </>
  );
}
