import React, { ReactElement } from 'react';

import styles from './ProfilePicture.module.css';
import avatar from '../../../assets/avatar.png';

interface Props {
  style: {};
  avatarUrl?: string;
}

export default function ProfilePicture({
  style,
  avatarUrl
}: Props): ReactElement {
  return (
    <div style={style} className={styles.ProfilePicture}>
      <img src={avatarUrl || avatar} alt="profile avatar" />
    </div>
  );
}
