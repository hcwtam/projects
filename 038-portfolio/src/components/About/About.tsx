import React, { ReactElement } from 'react';

import portrait from '../../assets/portrait.jpeg';
import styles from './About.module.css';
import javascript from '../../assets/javascript.png';
import typescript from '../../assets/typescript.png';
import htmlcss from '../../assets/htmlcss.png';
import react from '../../assets/react.png';
import git from '../../assets/git.png';

interface Props {}

export default function About({}: Props): ReactElement {
  return (
    <section className={styles.About} id="aboutme">
      <article className={styles.Article}>
        <h3>About Me</h3>
        <p>
          I am passionate in web development and design. Whether it's a website
          or an application, I strive to provide an intuitive and fluid user
          experience.
        </p>
        <p>
          I graduated from the{' '}
          <a href="https://www.bath.ac.uk/">University of Bath</a> with a
          master's degree in Mechanical Engineer. Having worked as an engineer
          in the robotics field, I discovered my interest in computer science
          and programming. I enjoy using my technical and analytical skills to
          solve challenges.
        </p>
      </article>
      <div className={styles.ImageContainer}>
        <img src={portrait} alt="portrait" />
      </div>
      <div className={styles.Technologies}>
        <h4>Here are the technologies I use daily:</h4>
        <ul>
          <li>
            <div className={styles.Container}>
              <img src={javascript} alt="Javascript logo" />
            </div>
            Javascript ES6+
          </li>
          <li>
            <div className={styles.Container}>
              <img src={react} alt="React logo" />
            </div>
            React
          </li>
          <li>
            <div className={styles.Container}>
              <img src={typescript} alt="Typescript logo" />
            </div>
            Typescript
          </li>
          <li>
            <div className={styles.Container}>
              <img src={htmlcss} alt="HTML and CSS logos" />
            </div>
            HTML &amp; CSS
          </li>
          <li>
            <div className={styles.Container}>
              <img src={git} alt="Git logo" />
            </div>
            Git
          </li>
        </ul>
      </div>
    </section>
  );
}
