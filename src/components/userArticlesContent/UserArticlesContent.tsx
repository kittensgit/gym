import { FC } from 'react';
import { Link } from 'react-router-dom';

import ArticleCards from 'components/articleCards/ArticleCards';

import plusIcon from 'assets/icons/plus.png';
import emptyIcon from 'assets/icons/empty.png';
import { IArticle } from 'types/articles/articles';

import styles from './UserArticlesContent.module.css';

interface UserArticlesProps {
    articles: IArticle[];
}

const UserArticlesContent: FC<UserArticlesProps> = ({ articles }) => {
    return (
        <div className={styles.wrapper}>
            <Link to={'/create'}>
                <button className={styles.btn_plus}>
                    <img src={plusIcon} alt="plus" />
                    Добавить статью
                </button>
            </Link>
            {articles.length ? (
                <ArticleCards articles={articles} />
            ) : (
                <p className={styles.message}>
                    Статьи еще не были добавлены
                    <img src={emptyIcon} alt="empty" />
                </p>
            )}
        </div>
    );
};

export default UserArticlesContent;
