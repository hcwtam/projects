import React from 'react';

import styles from './Numpad.module.css';

const Numpad = ({clicked, calculate, clear}) => {
    return (
        <div className={styles.Numpad}>
            <div onClick={clear} className={styles.Top}>C</div>
            <div onClick={() => clicked('(')} className={styles.Top}>(</div>
            <div onClick={() => clicked(')')} className={styles.Top}>)</div>
            <div onClick={() => clicked('/')} className={styles.Ops}>÷</div>
            <div onClick={() => clicked('7')}>7</div>
            <div onClick={() => clicked('8')}>8</div>
            <div onClick={() => clicked('9')}>9</div>
            <div onClick={() => clicked('*')} className={styles.Ops}>×</div>
            <div onClick={() => clicked('4')}>4</div>
            <div onClick={() => clicked('5')}>5</div>
            <div onClick={() => clicked('6')}>6</div>
            <div onClick={() => clicked('-')} className={styles.Ops}>−</div>
            <div onClick={() => clicked('1')}>1</div>
            <div onClick={() => clicked('2')}>2</div>
            <div onClick={() => clicked('3')}>3</div>
            <div onClick={() => clicked('+')} className={styles.Ops}>+</div>
            <div onClick={() => clicked('0')} className={styles.Zero}>0</div>
            <div onClick={() => clicked('.')}>.</div>
            <div 
                onClick={calculate}
                className={`${styles.Ops} ${styles.Equal}`}>=</div>
        </div>
    );
};

export default Numpad;