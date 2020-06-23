import React from 'react';

import styles from './ButtonTall.module.css';

const ButtonTall = (props) => (
    <button 
        disabled={props.disabled} 
        className={styles.ButtonTall}
        onMouseOver={() => props.onHover && props.onHover(props.children)}
        onMouseLeave={() => props.onHover && props.onHover(null)}
        onClick={() => props.clicked && props.clicked(props.children)}><i className={props.icon}/></button>
);

export default ButtonTall;