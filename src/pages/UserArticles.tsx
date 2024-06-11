import { FC, useEffect, useState } from 'react';
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from 'firebase/firestore';

import Loading from 'components/common/loading/Loading';
import UserArticlesContent from 'components/userArticlesContent/UserArticlesContent';

import { useAuth } from 'hooks/useAuth';
import { IArticle } from 'types/articles/articles';

const UserArticles: FC = () => {
    const { username, avatarUrl } = useAuth();
    const db = getFirestore();
    const articlesRef = collection(db, 'articles');

    const [articles, setArticles] = useState<IArticle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getArticles = async () => {
            try {
                setIsLoading(true);

                const q = query(
                    articlesRef,
                    where('user.username', '==', username)
                );
                const dataArticles = await getDocs(q);

                const filteredArticles = dataArticles.docs.map((articleDoc) => {
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
                });

                setArticles(filteredArticles);
            } finally {
                setIsLoading(false);
            }
        };

        getArticles();
    }, [avatarUrl]);

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <UserArticlesContent articles={articles} />
            )}
        </div>
    );
};

export default UserArticles;
