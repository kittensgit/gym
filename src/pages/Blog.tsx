import { FC, useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

import BlogContent from 'components/blogContent/BlogContent';

import { IArticle } from 'types/articles/articles';

const Blog: FC = () => {
    const db = getFirestore();
    const articlesRef = collection(db, 'articles');
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getArticles = async () => {
            try {
                setIsLoading(true);
                const dataArticles = await getDocs(articlesRef);
                const filteredArticles: IArticle[] = dataArticles.docs.map(
                    (articleDoc) => {
                        const data = articleDoc.data();
                        return {
                            id: articleDoc.id,
                            name: data.name,
                            description: data.description,
                            content: data.content,
                            createdAt: {
                                date: data.createdAt.date,
                                formatedDate: data.createdAt.formatedDate,
                            },
                            user: {
                                username: data.user.username,
                                avatarUrl: data.user.avatarUrl,
                            },
                            image: data.image,
                        };
                    }
                );
                setArticles(filteredArticles);
            } finally {
                setIsLoading(false);
            }
        };
        getArticles();
    }, []);

    return (
        <div className="container">
            <BlogContent articles={articles} isLoading={isLoading} />
        </div>
    );
};

export default Blog;
