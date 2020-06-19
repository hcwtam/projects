import React from 'react';

import styles from './Display.module.css';

const Display = (props) => {
    const image = props.picture;

    return (
        <div className={styles.Display}>
            {image}
        </div>
    );
};

export default Display;