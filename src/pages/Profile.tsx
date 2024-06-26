import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    updateDoc,
    where,
    writeBatch,
} from 'firebase/firestore';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';

import ProfileContent from 'components/profileContent/ProfileContent';

import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { IUser } from 'types/user/user';

import { removeUser, setUser } from '../redux/ProfileSlice';

interface IUserInfo {
    aim: IUser['aim'];
    aboutText: IUser['aboutText'];
}

const Profile: FC = () => {
    const db = getFirestore();
    const storage = getStorage();
    const dispatch = useAppDispatch();

    const user = useAuth();
    const { isAuth, username, id } = user;

    const [userInfo, setUserInfo] = useState<IUserInfo>({
        aim: '',
        aboutText: '',
    });
    const [avatarUrl, setAvatarUrl] = useState<IUser['avatarUrl']>('');

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    useEffect(() => {
        const getUserInfoFromFirebase = async () => {
            if (id && !isEdit) {
                try {
                    setIsLoading(true);
                    const userRef = doc(db, 'users', `${id}`);
                    const docSnapshot = await getDoc(userRef);
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        const { aim, aboutText, avatarUrl } = userData;
                        setUserInfo({ aim, aboutText });
                        setAvatarUrl(avatarUrl);
                    }
                } finally {
                    setIsLoading(false);
                }
            }
        };

        getUserInfoFromFirebase();
    }, [id, isEdit, db]);

    const uploadAvatarInStorage = (file: File) => {
        try {
            const storageRef = ref(storage, `users/avatars/${id}/${file.name}`);
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
                    setAvatarUrl(downloadURL);
                    setIsUploading(false);
                }
            );
        } finally {
            setIsUploading(false);
        }
    };

    const updateUserInfo = (name: string, value: string) => {
        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    };

    const addUserInfoToFirebase = async (
        aim: IUser['aim'],
        aboutText: IUser['aboutText'],
        avatarUrl: IUser['avatarUrl']
    ) => {
        try {
            setIsLoading(true);
            if (id) {
                const userRef = doc(db, 'users', `${id}`);
                if (userInfo.aim) {
                    await updateDoc(userRef, {
                        aim,
                        aboutText,
                        avatarUrl,
                    });

                    const q = query(
                        collection(db, 'articles'),
                        where('user.username', '==', username)
                    );
                    const querySnapshot = await getDocs(q);

                    // Обновляем поле avatarUrl в каждой статье
                    const batch = writeBatch(db);
                    querySnapshot.forEach((articleDoc) => {
                        const articleRef = doc(db, 'articles', articleDoc.id);
                        batch.update(articleRef, {
                            user: {
                                username,
                                avatarUrl,
                            },
                        });
                    });
                    await batch.commit();
                } else {
                    await setDoc(userRef, {
                        aim,
                        aboutText,
                        avatarUrl,
                    });
                }
                dispatch(
                    setUser({
                        ...user,
                        avatarUrl,
                    })
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const onLogOut = () => {
        setUserInfo({
            aboutText: '',
            aim: '',
        });
        setAvatarUrl('');
        dispatch(removeUser());
    };

    return (
        <>
            {isAuth ? (
                <ProfileContent
                    userId={id}
                    username={username}
                    avatarUrl={avatarUrl}
                    userProfileData={userInfo}
                    isLoading={isLoading}
                    isEdit={isEdit}
                    isUploading={isUploading}
                    onLogOut={onLogOut}
                    uploadAvatarInStorage={uploadAvatarInStorage}
                    updateUser={updateUserInfo}
                    toggleEdit={toggleEdit}
                    addUserInfoToFirebase={addUserInfoToFirebase}
                />
            ) : (
                <Navigate replace to={'/signin'} />
            )}
        </>
    );
};

export default Profile;
