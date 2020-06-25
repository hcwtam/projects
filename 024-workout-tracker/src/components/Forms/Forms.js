import React, {useState, useEffect, useCallback} from 'react';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import axios from '../../axios-orders';


import styles from './Forms.module.css';
import Navbar from '../Navigation/Navbar/Navbar';
import Footer from '../UI/Footer/Footer';
import Form from './Form/Form';
import Button from '../UI/Button/Button';

const Forms = props => {
    const data = [...props.data];
    const [output, setOutput] = useState(data.map(el => 2.5));
    const [message, setMessage] =useState(null);

    const today = moment().format('YYYY-MM-DD');
    let forms = null;
    
    const incHandler = useCallback((position) => {
        const update = [...output];
        if (isNaN(update[position])) update[position] = 2.5;
        update[position] += 2.5;

        setOutput(update);
        // console.log(update);
    }, [output])
    
    const decHandler = useCallback((position) => {
        const update = [...output];
        if (isNaN(update[position])) update[position] = 2.5;
        update[position] -= 2.5;
        setOutput(update);
        // console.log(update);
    }, [output])
    
    const changeHandler = useCallback((weight, position) => {
        if (isNaN(weight) && weight !== '') setOutput(output);
        const update = [...output];
        update[position] = weight;
        setOutput(update);
        // console.log(update);
    }, [output])
    
    const submitHandler = useCallback(() => {
        if (output[0]) {const submitData = {
            weights: output,
            date: today,
            type: data
        }
        
        axios.post(`/${props.title}.json`, submitData)
        .then(response => {
            console.log(response);
            setMessage('Great!');})
            .catch(error => {
                // console.log(error);
                setMessage("Something's wrong...")})};
        }, [output, props.title, today, data])
        
    let footer = <Footer back dumbbell />;
    if (message) footer = <Footer back dumbbell isActive/>;

    let submitButton = (
        <Button 
            onHover={null} 
            clicked={submitHandler}>{message ? message : `submit`}</Button>
    )
    let icon = null;

    if (message === 'Great!') {
        submitButton = (
            <Button 
                success
                onHover={null} 
                clicked={submitHandler}>{message ? message : `submit`}</Button>
        );
        icon = (
            <i className={`${styles.icon} fa fa-music`} />
        );
    }

    if (message === "Something's wrong...") {
        submitButton = (
        <Button 
            fail
            onHover={null} 
            clicked={submitHandler}>{message ? message : `submit`}</Button>
    );
        icon = (
            <i style={{color: 'grey'}} className={`${styles.icon} fas fa-signature`} />
        );
    }
            
    useEffect(() => {
        if (message === 'Great!') {
            setTimeout(()=> props.history.push({
                pathname: '/stats',
            state: {
                type: props.title.charAt(0).toUpperCase() + props.title.slice(1, 4)
            }}),1500);
        }
    },[message, props.history, props.title]);
    
    const fetchWeights = useCallback(() => {
        axios.get(`/${props.title}.json`)
            .then(response => {
                const array = [];
                // console.log(response.data);
                if (response.data) {
                    for (const key in response.data) {
                        array.push(response.data[key]);
                    }
                    setOutput(array[array.length - 1].weights);
                }
            });
    }, [props.title]);

    useEffect(() => {
        fetchWeights();
    },[fetchWeights])


    // const data = [
    //     {excercise: 1},
    //     {excercise: 2},
    //     {excercise: 3}
    // ];

    if (data) forms = data.map((el, i) => (<Form 
            reps={el.reps} 
            excercise={el.excercise}
            key={i}
            position={i}
            weight={output[i]} 
            changed={(weight, position)=>changeHandler(weight, position)}
            inc={(position)=>incHandler(position)}
            dec={(position)=>decHandler(position)}/>
    ));

    return (
        <div className={styles.Forms}>
            <Navbar title={props.title}/>
            <div className={styles.content}>
                <div className={styles.header}>{`${today}: ${props.title} Day`}</div>
                <div className={styles.formsContainer} >
                    <div>
                        {forms}
                        <div className={styles.mobileSubmit}>
                            {submitButton}
                        </div>
                    </div>
                </div>
                <div style={{marginTop: -22}}>
                    {submitButton}
                </div>
            </div>
            {icon}
            {footer}
        </div>
    );
};

export default withRouter(Forms);