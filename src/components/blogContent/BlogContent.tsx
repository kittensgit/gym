import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';

import ArticleCard from 'components/articleCard/ArticleCard';

import { IArticle } from 'types/articles/articles';

import decorIcon from 'assets/icons/decor.png';
import arrowIcon from 'assets/icons/arrow_red.png';

import styles from './BlogContent.module.css';

interface BlogContentProps {
    isLoading: boolean;
    articles: IArticle[];
}

const BlogContent: FC<BlogContentProps> = ({ articles, isLoading }) => {
    const sortedArticles = articles.sort((a1, a2) => {
        const dateA1 = (a1.createdAt.date as Timestamp).toDate().getTime();
        const dateA2 = (a2.createdAt.date as Timestamp).toDate().getTime();
        return dateA2 - dateA1;
    });
    return (
        <div className={styles.wrapper}>
            <div className={styles.preview}>
                <h1>
                    Добро пожаловать в блог <span>NGYMX</span>!
                </h1>
                <div className={styles.decor}>
                    <div className={styles.line}></div>
                    <img src={decorIcon} alt="decor" />
                    <div className={styles.line}></div>
                </div>
                <p>
                    Следите за новостями, советами и историями успеха с нашим
                    спортивным трекером NGYMX. Делайте каждый шаг на пути к
                    своим фитнес-целям вместе с нами!
                </p>
                <Link to={'/create'}>
                    <button className={styles.btn}>
                        Создайте свою статью
                        <img src={arrowIcon} alt="arrow" />
                    </button>
                </Link>
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className={styles.articles}>
                    {sortedArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogContent;
