import React, {useState} from 'react';

import styles from './Home.module.css';
import Display from './Display/Display';
import Navbar from '../Navigation/Navbar/Navbar';
import Footer from '.././UI/Footer/Footer';
import Button from '.././UI/Button/Button';
import ButtonTall from '.././UI/ButtonTall/ButtonTall';
import Legs from '../../assets/Legs.gif';
import Push from '../../assets/Push.gif';
import Pull from '../../assets/Pull.gif';
import chart from '../../assets/chart.gif';
import setting from '../../assets/setting.gif';

const Home = () => {
    const [image, setImageName] = useState(null);

    let imageName;

    const imageNameCases = (name) => {
        switch (name) {
            case 'Legs':
                imageName = Legs;
                break;
            case 'Push':
                imageName = Push;
                break;
            case 'Pull':
                imageName = Pull;
                break;
            case 'chart':
                imageName = chart;
                break;
            case 'setting':
                imageName = setting;
                break;
        
            default:
                break;
        }
    }

    const hoverHandler = (name) => {
        imageNameCases(name);
        imageName ? setImageName((<img src={imageName} alt={name} /> )) : setImageName(null);
    }

    return (
        <div className={styles.Home}>
            <Navbar />
            <div className={styles.Panel}>
                <Display picture={image}/>
                <ButtonTall onHover={hoverHandler} icon="fas fa-chart-line">chart</ButtonTall>
                <ButtonTall onHover={hoverHandler} icon="fas fa-cog">setting</ButtonTall>
            </div>
            <div className={styles.Buttons}>
                <Button onHover={hoverHandler}>Pull</Button>
                <Button onHover={hoverHandler}>Push</Button>
                <Button onHover={hoverHandler}>Legs</Button>
                <Button disabled onHover={hoverHandler}>Empty</Button>
            </div>
            <Footer />
        </div>
    );
};

export default Home;