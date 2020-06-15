import React from 'react';

import styles from './SocialCard.module.css';
import profilePic from '../../assets/profile-pic.jpg';
import mainPic from '../../assets/main.png';
import Bar from './Bar/Bar';
import Dropdown from './Dropdown/Dropdown';

const SocialCard = () => {
    return (
        <div className={styles.SocialCard}>
            <div className={styles.Profile}><img src={profilePic} alt='profile'/></div>
            <div className={styles.Content}>
                <div><strong>Wesley Tam</strong> <span style={{color: 'grey'}}>@WesleyTam · Jun 15</span></div>
                <div>10 reasons why React is fun.</div>
                <div>&#123; author: <a href='/'>@WesleyTam</a> &#125;</div>
                <div className={styles.Main}>
                    <a href="/">
                        <div className={styles.MainPic}><img src={mainPic} alt='Content'/></div>
                        <div className={styles.MainText}>
                            <div style={{marginTop: 3, marginBottom: 3}}><strong>10 reasons why React is fun</strong></div>
                            <div>Still wondering what to learn? Choose React! Here are the ten reasons why you will fall in love with it.</div>
                            <div style={{marginTop: 3, color: 'grey'}}>example.com</div>
                        </div>
                    </a>
                </div>
                <Bar />
                <Dropdown />
            </div>
        </div>
    );
};

export default SocialCard;