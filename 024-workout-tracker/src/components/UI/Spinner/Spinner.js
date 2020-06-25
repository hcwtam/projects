import React from 'react';

import styles from './Spinner.module.css';

const Spinner = props => {
    return (
        <div style={props.color && {color: `${props.color}`}} className={styles.loader}>Loading...</div>
    );
};

export default Spinner;