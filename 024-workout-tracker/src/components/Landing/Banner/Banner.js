import React from 'react';

import styles from './Banner.module.css';

const Banner = ({isActive}) => {
    return (
        <React.Fragment>
            <div className={isActive ? `${styles.BannerTop} ${styles.active}` : styles.BannerTop}>
                <div className={styles.top}></div>
                <div className={styles.middle}></div>
                <div className={styles.bottom}></div>
                <div className={styles.white}></div>
            </div>
            <div className={isActive ? `${styles.BannerBottom} ${styles.active}` : styles.BannerBottom}>
                <div className={styles.white}></div>
                <div className={styles.bottom}></div>
                <div className={styles.middle}></div>
                <div className={styles.top}></div>
            </div>
        </React.Fragment>
    );
};

export default Banner;