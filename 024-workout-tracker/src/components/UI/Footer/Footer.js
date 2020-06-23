import React from 'react';
import {withRouter} from 'react-router-dom';

import styles from './Footer.module.css';
import Dumbbell from '../Dumbbell/Dumbbell';

const Footer = props => {
    let back = null, dumbbell = null;
    if (props.back) back = (
        <div 
            className={styles.back} 
            onClick={() => props.history.goBack()}>
            <div className={styles.circle}>
                <i className='fa fa-arrow-left' />
            </div> Back
        </div>
    )

    if (props.dumbbell) dumbbell = (
        <div className={styles.dumbbell}>
            <div className={styles.dumbbellContainer}>
                <Dumbbell isActive={props.isActive} />
            </div>
        </div>
                )

    return (
            <div className={styles.Footer}>
                    <div className={styles.border} />
                {back}
                {dumbbell}
            </div>
    );
};

export default withRouter(Footer);