import { FC, useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

import UserArticlesContent from 'components/userArticlesContent/UserArticlesContent';

import { useAuth } from 'hooks/useAuth';
import { IArticle } from 'types/articles/articles';

const UserArticles: FC = () => {
    const { username } = useAuth();
    const db = getFirestore();
    const articlesRef = collection(db, 'articles');

    const [articles, setArticles] = useState<IArticle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getArticles = async () => {
            try {
                setIsLoading(true);
                const dataArticles = await getDocs(articlesRef);
                const filteredArticles: IArticle[] = dataArticles.docs
                    .map((articleDoc) => {
                        const data = articleDoc.data();
                        const {
                            name,
                            description,
                            content,
                            createdAt,
                            user,
                            image,
                        } = data;
                        return {
                            id: articleDoc.id,
                            name: name,
                            description: description,
                            content: content,
                            createdAt: {
                                date: createdAt.date,
                                formatedDate: createdAt.formatedDate,
                            },
                            user: {
                                username: user.username,
                                avatarUrl: user.avatarUrl,
                            },
                            image: image,
                        };
                    })
                    .filter((article) => article.user.username === username);
                setArticles(filteredArticles);
            } finally {
                setIsLoading(false);
            }
        };
        getArticles();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <UserArticlesContent articles={articles} />
            )}
        </div>
    );
};

export default UserArticles;
