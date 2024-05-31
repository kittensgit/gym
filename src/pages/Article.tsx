import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

import ArticleContent from 'components/articleContent/ArticleContent';

import { IArticle } from 'types/articles/articles';

const Article: FC = () => {
    const { articleId } = useParams();
    const db = getFirestore();

    const [article, setArticle] = useState<IArticle>({
        id: '',
        name: '',
        description: '',
        content: '',
        createdAt: {
            date: new Date(),
            formatedDate: '',
        },
        user: {
            username: '',
            avatarUrl: '',
        },
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const getArticle = async () => {
            try {
                setIsLoading(true);
                const articleRef = doc(db, 'articles', `${articleId}`);
                const articleSnap = await getDoc(articleRef);
                if (articleSnap.exists()) {
                    const articleData = articleSnap.data() as IArticle;
                    setArticle({
                        ...articleData,
                        id: articleSnap.id,
                    });
                }
            } catch {
                setError('Такого документа не существует!');
            } finally {
                setIsLoading(false);
            }
        };
        getArticle();
    }, [articleId]);

    return (
        <div className="container">
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <ArticleContent articleData={article} />
            )}
        </div>
    );
};

export default Article;
