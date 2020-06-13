import React, {useState, useRef} from 'react';

import faceImage from '../assets/cinnamoroll.png';
import HappyFaceImage from '../assets/cinnamoroll-happy.png';
import styles from './Face.module.css';

const Face = () => {

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const[smile, setSmile] = useState(false);
    const leftEye = useRef(null);

    const followCursor = (e) => {
        const screenX = e.nativeEvent.clientX;
        const screenY = e.nativeEvent.clientY;
        // Middle of page = leftEye.current.offsetLeft + 65, leftEye.current.offsetTop + 15
        const faceX = leftEye.current.offsetLeft + 65;
        const faceY = leftEye.current.offsetTop + 15;

        const moveX = (screenX - faceX) / 120;
        const moveY = (screenY - faceY) / 120;
        setX(moveX);
        setY(moveY);
    }

    // Change image

    const changePic = () => setSmile(!smile);

    return (
        <div className={styles.Face} onMouseMove={followCursor}>
            <div 
                className={styles.LeftEye+' EyeRoll'}   
                ref={leftEye}            
                style={{
                    transform: `translate(${x}px, ${y}px) rotate(10deg)`
            }}/>
            <div 
                className={styles.RightEye+' EyeRoll'} 
                style={{
                    transform: `translate(${x}px, ${y}px) rotate(10deg)`
            }}/>
            <div onClick={changePic}>
            {smile ? <img src={HappyFaceImage} alt="cinnamoroll" /> : <img src={faceImage} alt="cinnamoroll" />}
            </div>
        </div>
    );
};

export default Face;