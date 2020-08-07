import React, { ReactElement } from 'react';

import Posts from './Posts/Posts';
import Sidebar from './Sidebar/Sidebar';
import styles from './Homepage.module.css';
import Navbar from '../Navbar/Navbar';

interface Props {}

export default function Homepage({}: Props): ReactElement {
  return (
    <>
      <Navbar />
      <main className={styles.Homepage}>
        <Posts />
        <Sidebar />
      </main>
    </>
  );
}
