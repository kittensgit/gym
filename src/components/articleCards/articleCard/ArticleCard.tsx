import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';

import { IArticle } from 'types/articles/articles';
import { distanceDate } from 'helpers/formatDate';

import avaIcon from 'assets/icons/ava.png';

import styles from './ArticleCard.module.css';

interface ArticleCardProps {
    article: IArticle;
}

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
    const distanceTime = distanceDate(
        (article.createdAt.date as Timestamp).toDate()
    );

    return (
        <Link to={`/article/${article.id}`}>
            <div className={styles.article}>
                {article.image && (
                    <img
                        className={styles.article_img}
                        src={article.image}
                        alt="article_img"
                    />
                )}
                <div className={styles.distanceTime}>{distanceTime} назад</div>
                <div className={styles.content}>
                    <h3>{article.name}</h3>
                    <p className={styles.article_text}>{article.description}</p>
                    <div className={styles.author}>
                        <div className={styles.info}>
                            <img
                                src={
                                    article.user.avatarUrl
                                        ? article.user.avatarUrl
                                        : avaIcon
                                }
                                alt="avatar"
                            />
                            <h4>{article.user.username}</h4>
                        </div>
                        <p className={styles.date}>
                            {article.createdAt.formatedDate}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ArticleCard;
