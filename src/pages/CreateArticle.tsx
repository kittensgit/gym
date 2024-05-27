import { FC, useState } from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';

import CreateArticleContent from 'components/createArticleContent/CreateArticleContent';

import { useAuth } from 'hooks/useAuth';
import { IArticle } from 'types/articles/articles';

const CreateArticle: FC = () => {
    const { isAuth, username } = useAuth();
    const db = getFirestore();
    const articlesRef = collection(db, 'articles');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addArticleToFirebase = async (article: IArticle) => {
        try {
            await addDoc(articlesRef, {
                ...article,
                user: {
                    username,
                },
            });
        } catch {
            console.log('ERROR');
        }
    };

    return (
        <div className="container">
            {isAuth ? (
                <CreateArticleContent
                    addArticleToFirebase={addArticleToFirebase}
                />
            ) : (
                <Navigate to={'/signin'} />
            )}
        </div>
    );
};

export default CreateArticle;
