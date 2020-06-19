import React from 'react';

import styles from './Button.module.css';

const Button = (props) => (
    <button 
        disabled={props.disabled} 
        className={styles.Button}
        onMouseOver={() => props.onHover(props.children)}
        onMouseLeave={() => props.onHover(null)}>{props.children}</button>
);

export default Button;