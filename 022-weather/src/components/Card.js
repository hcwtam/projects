import React, {useState, useEffect} from 'react';
import axios from 'axios';

import WeatherCards from './/WeatherCards/WeatherCards';
import Board from './Board/Board';
import styles from './Card.module.css';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Card = () => {
    const [index, setIndex] = useState(null);
    const [weathers, setWeathers] = useState([]);
    let card = null;
    useEffect(() => {
        axios.get('https://api.openweathermap.org/data/2.5/forecast?id=1819729&appid=340b889850afcd95cac35ff136040bc6')
            .then(response => {
                const weathersData = response.data.list;
                
                for (let i = 0; i < 40; i = i + 8) {
                    const time = new Date(weathersData[i].dt * 1000);

                    setWeathers(weathers.push({
                        weather: weathersData[i].weather[0].main,
                        description: weathersData[i].weather[0].description,
                        temp: Math.round(weathersData[i].main.temp - 273),
                        feelsLike: weathersData[i].main.feels_like,
                        humidity: weathersData[i].main.humidity,
                        wind: weathersData[i].wind.speed,
                        max: Math.round(weathersData[i].main.temp_max - 271),
                        min: Math.round(weathersData[i].main.temp_min - 275),
                        weekday: WEEKDAYS[time.getDay()]
                    }))
                }
            })
            .catch(error => {
                console.log(error);
            })
            console.log(weathers);
            
    }, [weathers])

    if(weathers.length === 5)
    card = (
        <React.Fragment>
        <Board weather={index ? weathers[index] : weathers[0]}/>
            <WeatherCards weathers={weathers} index={index} clicked={(i)=>setIndex(i)}/>
        </React.Fragment>)
    // const weathers = [
    //     {
    //         day: 'Tue',
    //         weather: 'cloud-sun',
    //         high: 31,
    //         low: 27
    //     },
    //     {
    //         day: 'Wed',
    //         weather: 'cloud-sun',
    //         high: 31,
    //         low: 27
    //     },
    //     {
    //         day: 'Thu',
    //         weather: 'cloud-rain',
    //         high: 31,
    //         low: 27
    //     },
    //     {
    //         day: 'Fri',
    //         weather: 'cloud-rain',
    //         high: 31,
    //         low: 27
    //     },
    //     {
    //         day: 'Sat',
    //         weather: 'cloud-rain',
    //         high: 32,
    //         low: 27
    //     }
    // ]
    return (
        <div className={styles.Card}>
            {card}
        </div>
    );
};

export default Card;