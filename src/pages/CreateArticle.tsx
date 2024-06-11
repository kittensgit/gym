import { FC, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';

import Loading from 'components/common/loading/Loading';
import CreateArticleContent from 'components/createArticleContent/CreateArticleContent';

import { useAuth } from 'hooks/useAuth';
import { IArticle } from 'types/articles/articles';

const CreateArticle: FC = () => {
    const { isAuth, username, avatarUrl } = useAuth();
    const navigate = useNavigate();

    const db = getFirestore();
    const articlesRef = collection(db, 'articles');
    const storage = getStorage();

    const [articleImg, setArticleImg] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addArticleToFirebase = async (article: IArticle) => {
        try {
            setIsLoading(true);
            const docRef = await addDoc(articlesRef, article);
            navigate(`/article/${docRef.id}`);
        } finally {
            setIsLoading(false);
        }
    };

    const uploaodImageInStorage = async (file: File) => {
        try {
            const storageRef = ref(storage, `articles/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    setIsUploading(true);
                },
                (error) => {
                    setIsUploading(false);
                },
                async () => {
                    const downloadURL = await getDownloadURL(
                        uploadTask.snapshot.ref
                    );
                    setArticleImg(downloadURL);
                    setIsUploading(false);
                }
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container">
            {isAuth ? (
                isLoading ? (
                    <Loading />
                ) : (
                    <CreateArticleContent
                        username={username}
                        avatarUrl={avatarUrl}
                        articleImg={articleImg}
                        isUploading={isUploading}
                        uploaodImageInStorage={uploaodImageInStorage}
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
