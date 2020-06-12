import React, {useState, useEffect} from 'react';
import styles from './ProgressBar.module.css';


const ProgressBar = props => {
    const [width, setWidth] = useState(10);
    useEffect(()=> {
        if (width < 400) {
            setTimeout(()=> {
                setWidth(width + 1)
            },5) 
        } else {
            setTimeout(()=> {
                setWidth(10)
            },1000)  
        }
    }, [width])
    const style = {
        width: width,
        height: 30,
        backgroundColor: 'rgb(39, 190, 39)',
        borderRadius: 5
    }
    
    return (
        <div className={styles.ProgressBar}>
            <div className={styles.Background}>
                <div className={styles.BarBackground}>
                    <div style={style} />
                </div>
                <div style={width === 400 ? {color: 'rgb(39, 190, 39)'} : {}} className={styles.Check}>✓</div>  
            </div>
        </div>
    );
};


export default ProgressBar;