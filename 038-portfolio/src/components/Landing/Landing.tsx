import React, { ReactElement } from 'react';

import styles from './Landing.module.css';

interface Props {}

export default function Landing({}: Props): ReactElement {
  return (
    <section className={styles.Landing}>
      <h6>Hello! My name is</h6>
      <h1>Wesley Tam.</h1>
      <h2>
        I'm a <strong>Front End Developer.</strong>
      </h2>
    </section>
  );
}
