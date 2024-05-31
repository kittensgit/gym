import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

import { IArticle } from 'types/articles/articles';

import styles from './ArticleContent.module.css';

interface ArticleContentProps {
    articleData: IArticle;
}

const ArticleContent: FC<ArticleContentProps> = ({ articleData }) => {
    return (
        <div className={styles.article}>
            <div className={styles.article_content}>
                <h1 className={styles.title}>{articleData.name}</h1>
                <p className={styles.description}>{articleData.description}</p>
                {articleData.image && (
                    <img src={articleData.image} alt="article_image" />
                )}
                <ReactMarkdown className={styles.markdown}>
                    {articleData.content}
                </ReactMarkdown>
            </div>
            <div className={styles.author}>
                <div className={styles.info}>
                    {articleData.user.avatarUrl && (
                        <img src={articleData.user.avatarUrl} alt="ava" />
                    )}
                    <h4>{articleData.user.username}</h4>
                </div>
                <p>{articleData.createdAt.formatedDate}</p>
            </div>
        </div>
    );
};

export default ArticleContent;
