import React, { ReactElement } from 'react';

import styles from './Card.module.css';

interface Props {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  link: string;
}

export default function Card({
  title,
  description,
  technologies,
  github,
  link
}: Props): ReactElement {
  return (
    <div className={styles.Card}>
      <h5>
        <a href="link" target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h5>
      <p>{description}</p>
      <ul>
        {technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <div className={styles.Icons}>
        <a href={github} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github" />
        </a>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-external-link-alt" />
          </a>
        )}
      </div>
    </div>
  );
}
