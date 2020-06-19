import React, {useState, useEffect} from 'react';

import styles from './Landing.module.css';
import Logo from '../UI/Logo/Logo';
import Dumbbell from '../UI/Dumbbell/Dumbbell';
import Banner from './Banner/Banner';

const Landing = props => {
    const [isActive, setIsActive] = useState(false);

    useEffect(()=> {
        setTimeout(() => {
            setIsActive(true);
        }, 1500);
    },[])

    useEffect(()=> {
        setTimeout(() => {
            props.history.push('/home');
        }, 3000);
    },[props])

    return (
        <div className={styles.Landing}>
            <Logo />
                <span className={styles.dumbbellContainer}>
                    <Dumbbell isActive={isActive}/>
                </span>
            <Banner isActive={isActive}/>
        </div>
    );
};

export default Landing;