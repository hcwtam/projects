import React from 'react';

import styles from './Navbar.module.css';
import LogoSmall from '../../UI/LogoSmall/LogoSmall';

const Navbar = () => {
    return (
        <React.Fragment>
            <div className={styles.Navbar}>
                <LogoSmall />
            </div>
            <div className={styles.border} />
        </React.Fragment>
    );
};

export default Navbar;