import React, { ReactElement } from 'react';

import styles from './Sidebar.module.css';

interface Props {}

export default function Sidebar({}: Props): ReactElement {
  return <aside className={styles.Sidebar}></aside>;
}
