import React from 'react';

import WeatherCard from './WeatherCard/WeatherCard';
import styles from './WeatherCards.module.css';

const WeatherCards = props => {
    const weathers = props.weathers;


    const weatherCards = weathers.map((el, i) => {
        return (
            <React.Fragment key={el.day}>
                <WeatherCard 
                    weather={el} 
                    isActive={props.index === i ? true : false} 
                    clicked={() => props.clicked(i)}/>
            </React.Fragment>
        )
    })

    return (
        <div className={styles.WeatherCards}>
            {weatherCards}
        </div>
    );
};

export default WeatherCards;