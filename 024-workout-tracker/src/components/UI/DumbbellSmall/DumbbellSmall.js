import React, {useState} from 'react';

import styles from './DumbbellSmall.module.css';


const DumbbellSmall = props => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={styles.DumbbellSmall} onClick={() => setIsActive(prev => !prev)}>
            <div className={isActive || props.isActive ? `${styles.top} ${styles.active}` : `${styles.top}`}></div>
            <div className={isActive || props.isActive ? `${styles.faceContainer} ${styles.active}` : `${styles.faceContainer}`}>
                <div className={styles.face}></div>
            </div>
            <div className={styles.bell}><div className={styles.light}></div></div>
            <div className={styles.bar}><div className={styles.light}></div></div>
            <div className={styles.bell}><div className={styles.light}></div></div>
            <div className={styles.bottom}></div>
        </div>
    );
};

export default DumbbellSmall;