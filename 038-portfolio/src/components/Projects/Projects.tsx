import React, { ReactElement } from 'react';

import styles from './Projects.module.css';
import reactgram from '../../assets/reactgram.jpg';
import fruity from '../../assets/fruity.png';
import other from './other.json';
import Card from './Card/Card';

interface Props {}

export default function Projects({}: Props): ReactElement {
  const cards = other.map(
    ({ title, description, technologies, github, link }) => (
      <Card
        title={title}
        description={description}
        technologies={technologies}
        github={github}
        link={link}
        key={title}
      />
    )
  );

  return (
    <section className={styles.Projects} id="projects">
      <h3>My Projects</h3>
      <div className={`${styles.Project} ${styles.Project1}`}>
        <div className={styles.ImageContainer}>
          <a href="" target="_blank" rel="noopener noreferrer">
            <img src={reactgram} alt="project 1" />
          </a>
        </div>
        <div className={styles.Description}>
          <h4>
            <a
              href="https://github.com/hcwtam/projects/tree/master/037-reactgram"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reactgram
            </a>
          </h4>
          <p>
            A clone of instagram built with react. You may share photos, add
            captions, follow friends, post comments and more.
          </p>
          <ul>
            <li>React</li>
            <li>Context</li>
            <li>SWR</li>
            <li>Typescript</li>
            <li>Firebase</li>
          </ul>
          <div className={styles.Icons}>
            <a
              href="https://github.com/hcwtam/projects/tree/master/037-reactgram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-external-link-alt" />
            </a>
          </div>
        </div>
      </div>
      <div className={`${styles.Project} ${styles.Project2}`}>
        <div className={styles.Description}>
          <h4>
            <a href="">Fruity</a>
          </h4>
          <p>
            An e-commerce application for online grcoery shopping. Includes an
            easy-to-use checkout, detail page for your favourite products, and
            own purchase history for your reference.
          </p>
          <ul>
            <li>React</li>
            <li>Redux</li>
            <li>Typescript</li>
            <li>Firebase</li>
          </ul>
          <div className={styles.Icons}>
            <a
              href="https://github.com/hcwtam/projects/tree/master/035-ecommerce"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-external-link-alt" />
            </a>
          </div>
        </div>
        <div className={styles.ImageContainer}>
          <a href="" target="_blank" rel="noopener noreferrer">
            <img src={fruity} alt="project 2" />
          </a>
        </div>
      </div>
      <h4>Other Projects</h4>
      <div className={styles.Others}>{cards}</div>
    </section>
  );
}
