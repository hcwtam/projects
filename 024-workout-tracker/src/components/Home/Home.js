import React, {useState} from 'react';

import styles from './Home.module.css';
import Display from './Display/Display';
import Navbar from '../Navigation/Navbar/Navbar';
import Footer from '.././UI/Footer/Footer';
import Button from '.././UI/Button/Button';
import ButtonTall from '.././UI/ButtonTall/ButtonTall';
import legs from '../../assets/legs.gif';
import push from '../../assets/push.gif';
import pull from '../../assets/pull.gif';
import stats from '../../assets/stats.gif';
import setting from '../../assets/setting.gif';

const Home = props => {
    const [image, setImageName] = useState(null);

    let imageName;

    const imageNameCases = (name) => {
        switch (name) {
            case 'legs':
                imageName = legs;
                break;
            case 'push':
                imageName = push;
                break;
            case 'pull':
                imageName = pull;
                break;
            case 'stats':
                imageName = stats;
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

    const pushHandler = (name) => {
        props.history.push(`/${name}`);
    }

    return (
        <div className={styles.Home}>
            <div className={styles.nav}>
                <Navbar title='Home'/>
            </div>
            <div className={styles.Panel}>
                <div className={styles.display}>
                    <Display picture={image}/>
                </div>
                <ButtonTall onHover={hoverHandler} clicked={pushHandler} icon="fas fa-chart-line">stats</ButtonTall>
                <ButtonTall onHover={hoverHandler} icon="fas fa-cog">setting</ButtonTall>
            </div>
            <div className={styles.Buttons}>
                <div className={styles.button}>
                    <Button onHover={hoverHandler} clicked={pushHandler}>pull</Button>
                </div>
                <div className={styles.button}>
                    <Button onHover={hoverHandler} clicked={pushHandler}>push</Button>
                </div>
                <div className={styles.button}>
                    <Button onHover={hoverHandler} clicked={pushHandler}>legs</Button>
                </div>
                <div className={styles.button}>
                        <Button disabled onHover={hoverHandler}>Empty</Button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;