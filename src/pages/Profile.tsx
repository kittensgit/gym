import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
    doc,
    getDoc,
    getFirestore,
    setDoc,
    updateDoc,
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

import { removeUser } from '../redux/ProfileSlice';

interface IUserInfo {
    aim: IUser['aim'];
    aboutText: IUser['aboutText'];
}

const Profile: FC = () => {
    const db = getFirestore();
    const storage = getStorage();
    const dispatch = useAppDispatch();

    const { isAuth, username, id } = useAuth();

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit]);

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
                    console.error('Upload failed', error);
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
        } catch (error) {
            console.error('Failed to upload photo', error);
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
                } else {
                    await setDoc(userRef, {
                        aim,
                        aboutText,
                        avatarUrl,
                    });
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    const onLogOut = () => {
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
