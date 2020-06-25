import React from 'react';

import styles from './Form.module.css';
import Counter from '../Counter/Counter';

const Form = props => {
    return (
        <div className={styles.Form}>
            <div className={styles.reps}>{props.reps}</div>
            <div className={styles.sets}>
                <div className={styles.repsMobile}>{props.reps}</div>
                <div className={styles.excercise}><div>{props.excercise}</div></div>
                <Counter 
                    changed={(weight)=>props.changed(weight, props.position)} 
                    weight={props.weight}
                    inc={()=>props.inc(props.position)}
                    dec={()=>props.dec(props.position)}/>
            </div>
        </div>
    );
};

export default Form;