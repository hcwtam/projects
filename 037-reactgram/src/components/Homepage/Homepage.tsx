import React, { ReactElement, useContext } from 'react';

import Posts from './Posts/Posts';
import Sidebar from './Sidebar/Sidebar';
import styles from './Homepage.module.css';
import Navbar from '../Navbar/Navbar';
import { userContext } from '../../store/user';

interface Props {}

export default function Homepage({}: Props): ReactElement {
  const userData = useContext(userContext);

  const { avatarUrl, username } = userData || false;
  return (
    <>
      <Navbar avatarUrl={avatarUrl} />
      <main className={styles.Homepage}>
        <Posts />
        <Sidebar avatarUrl={avatarUrl} username={username} />
      </main>
    </>
  );
}
