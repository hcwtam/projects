import React, {useState, useEffect, useCallback} from 'react';
import {withRouter} from 'react-router-dom';
import axios from '../../axios-orders';

import styles from './Stats.module.css';
import NavBar from '../Navigation/Navbar/Navbar';
import Footer from '../UI/Footer/Footer';
import ButtonSmall from '../UI/ButtonSmall/ButtonSmall';
import Chart from '../Stats/Chart/Chart';
import ProgressCard from './ProgressCard/ProgressCard';
import {pullDData, pullBRData, pushBPData, pushOPData, legsData} from '../Forms/formData';

const Stats = props => {
    const [showing, setShowing] = useState('legs');
    const [progressData, setProgressData] = useState(null);

    console.log(showing);

    const fetchWeights = useCallback((cards) => {
        axios.get(`/${showing}.json`)
            .then(response => {
                const array = [];
                // console.log(response.data);
                if (response.data) {
                    for (const key in response.data) {
                        array.unshift(response.data[key]);
                    }
                }
                console.log(array);
                setProgressData(array);
            });
    }, [showing]);

    useEffect(() => {
        fetchWeights();
    },[fetchWeights])

    let cards = null;

    if (progressData) cards = progressData.map((el, i) => (
        <ProgressCard 
            key={i} 
            date={el.date}
            weights={el.weights}
            excercise={legsData}/>))

    return (
        <div className={styles.Stats}>
            <NavBar title={props.title}/>
            <div className={styles.panel}>
                <div className={styles.chartContainer}>
                    <Chart />
                    <ButtonSmall clicked={(type)=>setShowing(type)}>pull</ButtonSmall>
                    <ButtonSmall clicked={(type)=>setShowing(type)}>push</ButtonSmall>
                    <ButtonSmall clicked={(type)=>setShowing(type)}>legs</ButtonSmall>
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