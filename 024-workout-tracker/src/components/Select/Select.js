import React from 'react';
import {withRouter} from 'react-router-dom';

import styles from './Select.module.css';
import NavBar from '../Navigation/Navbar/Navbar';
import Footer from '../UI/Footer/Footer';
import Button from '../UI/Button/Button';

const Select = props => {
    const choiceHandler = (index) => [
        props.history.push(`/${props.title}/${props.main[index]}`)
    ]

    return (
        <div className={styles.Select}>
            <NavBar title={props.title}/>
            <div className={styles.question}>Main lifts of the day?</div>
            <div className={styles.button}>
                <Button clicked={() => choiceHandler(0)} >{props.options[0]}</Button>
            </div>
            <div className={styles.button}>
                <Button clicked={() => choiceHandler(1)} >{props.options[1]}</Button>
            </div>
            <Footer back />
        </div>
    );
};

export default withRouter(Select);