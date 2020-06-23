import React from 'react';
import {withRouter} from 'react-router-dom';

import styles from './Navbar.module.css';
import LogoSmall from '../../UI/LogoSmall/LogoSmall';
import DumbbellSmall from '../../UI/DumbbellSmall/DumbbellSmall';

const Navbar = props => {
    return (
        <React.Fragment>
            <div className={styles.Navbar}>
                <div className={styles.title}>{props.title}</div>
                <div className={styles.home} onClick={() => props.history.push('/home')}>
                    <LogoSmall />
                </div>
                    <div style={{position: 'absolute', top: 15, right: 75}}><DumbbellSmall /></div>
            </div>
            <div className={styles.border} />
        </React.Fragment>
    );
};

export default withRouter(Navbar);