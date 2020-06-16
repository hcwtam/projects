import React from 'react';

import styles from './Board.module.css';

const Board = (props) => {
    const weather = props.weather;
    return (
        <div className={styles.Board}>
            <div>
                <div style={{fontSize: 24}}>Hong Kong</div>
                <div>{weather.weekday}</div>
                <div>{weather.description}</div>
                <i className={`fas fa-${weather.icon}`} />
                <div style={{
                    display: 'inline-block', 
                    fontSize: 60}}>{weather.temp}°</div>
            </div>
            <div style={{marginBottom: 20}}>
                <div>Feels like: {weather.feelsLike}°</div>
                <div>Humidity: {weather.humidity}%</div>
                <div>Wind: {weather.wind}km/h</div>
            </div>
        </div>

    );
};

export default Board;