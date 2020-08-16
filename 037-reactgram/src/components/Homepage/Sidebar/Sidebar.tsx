import React, { ReactElement } from 'react';

import styles from './Sidebar.module.css';
import ProfilePicture from '../../shared/ProfilePicture/ProfilePicture';
import { useHistory } from 'react-router-dom';

interface Props {
  avatarUrl: string;
  username: string;
}

export default function Sidebar({ avatarUrl, username }: Props): ReactElement {
  const history = useHistory();

  return (
    <aside className={styles.Sidebar}>
      <div className={styles.Fixed}>
        <div className={styles.User}>
          <div onClick={() => history.push(`/${username}`)}>
            <ProfilePicture
              avatarUrl={avatarUrl}
              style={{ width: 56, height: 56 }}
            />
          </div>
          <span onClick={() => history.push(`/${username}`)}>{username}</span>
        </div>
        <div className={styles.Copyright}>© 2020 Reactgram from Wesley Tam</div>
      </div>
    </aside>
  );
}
