import React, { ReactElement } from 'react';

import styles from './Contact.module.css';

interface Props {}

export default function Contact({}: Props): ReactElement {
  return (
    <section className={styles.Contact} id="contact">
      <h3>Get in Touch</h3>
      <p>
        Please feel free to contact me if you are looking for a developer, or
        just want to connect!
      </p>
      <a
        href="hcwtam@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: 24 }}
      >
        hcwtam@gmail.com
      </a>
    </section>
  );
}
