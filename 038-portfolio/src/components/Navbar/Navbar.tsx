import React, { ReactElement } from 'react';
import Link from 'react-router-dom';

import styles from './Navbar.module.css';

interface Props {}

export default function Navbar({}: Props): ReactElement {
  return (
    <nav className={styles.Navbar}>
      <div className={styles.Logo}>WT</div>
      <ul className={styles.Links}>
        <li>
          <a href="#aboutme">About Me</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <div className={styles.Icons}>
        <a href="" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin" />
        </a>
        <a href="" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github" />
        </a>
        <button className={styles.Resume}>Resume</button>
      </div>
    </nav>
  );
}
