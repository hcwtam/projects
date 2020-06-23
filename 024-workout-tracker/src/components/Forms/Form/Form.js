import React from 'react';

import styles from './Form.module.css';
import Counter from '../Counter/Counter';

const Form = props => {
    return (
        <div className={styles.Form}>
            <div style={{marginLeft: 30}}>{props.reps}</div>
            <div className={styles.sets}>
                <div>{props.excercise}</div>
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