import { FC } from 'react';

import { IArticle } from 'types/articles/articles';

import ArticleCard from './articleCard/ArticleCard';

import styles from './ArticleCards.module.css';

interface ArticleCardsProps {
    articles: IArticle[];
}

const ArticleCards: FC<ArticleCardsProps> = ({ articles }) => {
    return (
        <div className={styles.articles}>
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
};

export default ArticleCards;
