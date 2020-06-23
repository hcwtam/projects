import React from 'react';

import styles from './Button.module.css';

const ButtonSmall = (props) => {
    let buttonStyle = styles.Button;
    if (props.success) buttonStyle = [styles.Button, styles.success].join(' ');
    if (props.fail) buttonStyle = [styles.Button, styles.fail].join(' ');

    return (
    <button 
        disabled={props.disabled} 
        className={buttonStyle}
        onMouseOver={() => props.onHover && props.onHover(props.children)}
        onMouseLeave={() => props.onHover && props.onHover(null)}
        onClick={() => props.clicked && props.clicked(props.children)}>{props.children}</button>
)};

export default ButtonSmall;