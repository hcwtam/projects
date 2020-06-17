import React from 'react';

import styles from './Display.module.css';

const Display = ({answer, equation}) => {
    return (
        <div className={styles.Display}>
            <div style={{fontSize: 60, padding: '60px 40px 10px'}}>{answer}</div>
            <div style={{padding: '20px 40px'}}>{equation}</div>
        </div>
    );
};

export default Display;