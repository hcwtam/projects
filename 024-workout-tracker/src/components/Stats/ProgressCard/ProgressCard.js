import React from 'react';

import styles from './ProgressCard.module.css';

const ProgressCard = ({date, weights, excercise}) => {
    const weightData = weights.map((el,i) => (
        <React.Fragment key={i}>
            <div className={styles.weightData}>
                <div style={{textTransform: 'capitalize'}}>{`${excercise[i].excercise}:`}</div>
                <div><strong>{`${el} `}</strong>kg</div>
            </div>
            <div className={styles.break}/>
        </React.Fragment>
    ))

    return (
        <div className={styles.ProgressCard}>
            <div className={styles.date}>{date}</div>
            {weightData}
        </div>
    );
};

export default ProgressCard;