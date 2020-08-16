import React, { ReactElement } from 'react';

import styles from './Header.module.css';
import { OptionsIcon } from '../../../assets/svg/icons';
import { Link } from 'react-router-dom';

interface Props {
  avatarUrl: string;
  bio: string;
  fullName: string;
  username: string;
  website: string;
  postsCount: number;
}

export default function Header({
  avatarUrl,
  bio,
  fullName,
  username,
  website,
  postsCount
}: Props): ReactElement {
  return (
    <header className={styles.Header}>
      <div className={styles.Avatar}>
        <img src={avatarUrl} alt="avatar" />
      </div>
      <div className={styles.Info}>
        <div className={styles.Username}>
          <h1>{username}</h1>
          <Link to="/settings">Edit Profile</Link>
          <OptionsIcon />
        </div>
        <div className={styles.Stats}>
          <div>
            <strong>{postsCount} </strong>posts
          </div>
          <div>
            <strong>317 </strong>followers
          </div>
          <div>
            <strong>475 </strong>following
          </div>
        </div>
        <div className={styles.AboutMe}>
          {fullName && <div className={styles.Name}>{fullName}</div>}
          {bio && <div className={styles.Bio}>{bio}</div>}
          {website && (
            <a className={styles.Website} href={website}>
              {website}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
