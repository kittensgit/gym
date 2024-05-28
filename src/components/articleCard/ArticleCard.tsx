import { FC } from 'react';
import { Link } from 'react-router-dom';

import { IArticle } from 'types/articles/articles';

import typeImg from 'assets/type.jpg';

import styles from './ArticleCard.module.css';

interface ArticleCardProps {
    article: IArticle;
}

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
    return (
        <div className={styles.article}>
            {/* <img
                className={styles.article_img}
                src={typeImg}
                alt="article img"
            /> */}
            <Link to={`/article/${article.id}`}>
                <h3>{article.name}</h3>
            </Link>
            <p className={styles.article_text}>{article.description}</p>
            <div className={styles.author}>
                <div className={styles.info}>
                    {/* <img src={krisImg} alt="avatar" /> */}
                    <h4>Крис Котов</h4>
                </div>
                <p className={styles.date}>Май 25, 2024</p>
            </div>
        </div>
    );
};

export default ArticleCard;
