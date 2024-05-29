import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';

import { IArticle } from 'types/articles/articles';
import { distanceDate } from 'helpers/formatDate';

import typeImg from 'assets/type.jpg';

import styles from './ArticleCard.module.css';

interface ArticleCardProps {
    article: IArticle;
}

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
    const distanceTime = distanceDate(
        (article.createdAt.date as Timestamp).toDate()
    );

    return (
        <div className={styles.article}>
            {/* <img
                className={styles.article_img}
                src={typeImg}
                alt="article img"
            /> */}
            <div className={styles.distanceTime}>{distanceTime} назад</div>
            <h3>
                <Link to={`/article/${article.id}`}>{article.name}</Link>
            </h3>
            <p className={styles.article_text}>{article.description}</p>
            <div className={styles.author}>
                <div className={styles.info}>
                    {/* <img src={krisImg} alt="avatar" /> */}
                    <h4>{article.user.username}</h4>
                </div>
                <p className={styles.date}>{article.createdAt.formatedDate}</p>
            </div>
        </div>
    );
};

export default ArticleCard;
