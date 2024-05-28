import { FC, useState } from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';

import CreateArticleContent from 'components/createArticleContent/CreateArticleContent';

import { useAuth } from 'hooks/useAuth';
import { IArticle } from 'types/articles/articles';

const CreateArticle: FC = () => {
    const { isAuth, username } = useAuth();
    const navigate = useNavigate();
    const db = getFirestore();
    const articlesRef = collection(db, 'articles');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addArticleToFirebase = async (article: IArticle) => {
        try {
            setIsLoading(true);
            const docRef = await addDoc(articlesRef, {
                ...article,
                user: {
                    username,
                },
            });
            navigate(`/article/${docRef.id}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            {isAuth ? (
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <CreateArticleContent
                        addArticleToFirebase={addArticleToFirebase}
                    />
                )
            ) : (
                <Navigate to={'/signin'} />
            )}
        </div>
    );
};

export default CreateArticle;
