import React, {useState, useEffect, useCallback} from 'react';
import {withRouter} from 'react-router-dom';
import axios from '../../axios-orders';

import styles from './Stats.module.css';
import NavBar from '../Navigation/Navbar/Navbar';
import Footer from '../UI/Footer/Footer';
import ButtonSmall from '../UI/ButtonSmall/ButtonSmall';
import Chart from '../Stats/Chart/Chart';
import ProgressCard from './ProgressCard/ProgressCard';
import Spinner from '../UI/Spinner/Spinner';

const Stats = props => {
    // console.log(props);
    const [showing, setShowing] = useState(props.location.state ? props.location.state.type : 'Legs');
    const [progressData, setProgressData] = useState(null);

    // console.log(showing);

    const fetchWeights = useCallback(() => {
        let requestOne, requestTwo;
        if (showing === 'Legs') {
            requestOne = () => axios.get(`/legs.json`);
            requestTwo = () => {};
        } else if (showing === 'Pull') {
            requestOne = () => axios.get(`/pull (D).json`);
            requestTwo = () => axios.get(`/pull (BR).json`);
        } else if (showing === 'Push') {
            requestOne = () => axios.get(`/push (BP).json`);
            requestTwo = () => axios.get(`/push (OP).json`);
        }

        Promise.all([requestOne(), requestTwo()])
            .then((responses) => {
                const array = [];
                // console.log(responses);
                if (responses[0]) {
                    for (const key in responses[0].data) {
                        array.unshift(responses[0].data[key]);
                    }
                }
                if (responses[1]) {
                    for (const key in responses[1].data) {
                        array.unshift(responses[1].data[key]);
                    }
                }
                array.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
                // console.log(array);
                setProgressData(array);
            })
        }, [showing]);

    useEffect(() => {
        fetchWeights();
    },[fetchWeights])

    let cards = <Spinner />;

    if (progressData) cards = progressData.map((el, i) => (
        <ProgressCard 
            key={i} 
            date={el.date}
            weights={el.weights}
            excercise={el.type}/>))

    let chart = <Chart title={showing} progressData={progressData} />

    return (
        <div className={styles.Stats}>
            <NavBar title={props.title}/>
            <div className={styles.panel}>
                <div className={styles.chartContainer}>
                    {chart}
                    <div className={styles.buttons}>
                        <ButtonSmall clicked={(type)=>setShowing(type)}>Pull</ButtonSmall>
                        <ButtonSmall clicked={(type)=>setShowing(type)}>Push</ButtonSmall>
                        <ButtonSmall clicked={(type)=>setShowing(type)}>Legs</ButtonSmall>
                    </div>
                </div>
            </div>
            <div className={styles.progress}>
                {cards}
            </div>
            <Footer back />
        </div>
    );
};

export default withRouter(Stats);