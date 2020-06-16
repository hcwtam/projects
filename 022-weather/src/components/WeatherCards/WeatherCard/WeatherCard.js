import React from 'react';

import styles from './WeatherCard.module.css';

const WeatherCard = (props) => {
    const weather = props.weather;


    return (
        <div 
            className={props.isActive ? `${styles.WeatherCard} ${styles.active}` : styles.WeatherCard} onClick={props.clicked} >
            <div style={{fontSize: 16}}>{weather.weekday}</div>
            <i className={`fas fa-sun`} />
            <div><span style={{color: 'grey'}}>{weather.max}°</span><span>{weather.min}°</span></div>
        </div>
    );
};

export default WeatherCard;