import React, {useState} from 'react';

import styles from './Bar.module.css';

const Bar = props => {
    const [commented, setcommented] = useState(false);
    const [commentsCount, setCommentsCount] = useState(18);
    const [retweeted, setRetweeted] = useState(false);
    const [retweetsCount, setRetweetsCount] = useState(52);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(173);

    
    const commentHandler = () => {
        if (commented) {
            setCommentsCount(commentsCount - 1);
            setcommented(false);
        } else {
            setCommentsCount(commentsCount + 1);
            setcommented(true);
        }
    }
    const retweetHandler = () => {
        if (retweeted) {
            setRetweetsCount(retweetsCount - 1);
            setRetweeted(false);
        } else {
            setRetweetsCount(retweetsCount + 1);
            setRetweeted(true);
        }
    }
    const likeHandler = () => {
        if (liked) {
            setLikesCount(likesCount - 1);
            setLiked(false);
        } else {
            setLikesCount(likesCount + 1);
            setLiked(true);
        }
    }


    return (
        <div className={styles.Bar}>
            <span 
                onClick={commentHandler}
                style={{
                    color: commented ? 'rgb(0, 132, 255)' : null}}><i className="fa fa-comment-o" />{commentsCount}</span>
            <span 
                onClick={retweetHandler}
                style={{
                    color: retweeted ? 'rgb(1, 165, 1)' : null}}><i className="fa fa-retweet" />{retweetsCount}</span>
            <span 
                onClick={likeHandler}
                style={{
                    color: liked ? 'red' : null}}><i className="fa fa-heart-o" />{likesCount}</span>
            <span><i className="fa fa-envelope-o" /></span>
        </div>
    );
};

export default Bar;