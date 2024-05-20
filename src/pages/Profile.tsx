import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
    doc,
    getDoc,
    getFirestore,
    setDoc,
    updateDoc,
} from 'firebase/firestore';

import ProfileContent from 'components/profileContent/ProfileContent';

import { useAuth } from 'hooks/useAuth';
import { IUpdateUser } from 'types/user/user';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';

const Profile: FC = () => {
    const { isAuth, username, id } = useAuth();
    const db = getFirestore();
    const storage = getStorage();

    const [user, setUser] = useState<IUpdateUser>({
        aim: '',
        aboutText: '',
        avatar: {
            file: null,
            url: '',
        },
    });

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateUser = (name: string, value: string) => {
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [uploading, setUploading] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setUser({
                    ...user,
                    avatar: {
                        file: file,
                        url: reader.result as string,
                    },
                });
                try {
                    setUploading(true);
                    const storageRef = ref(storage, `avatars/${file.name}`);

                    // Загружаем файл в Firebase Storage
                    await uploadBytesResumable(storageRef, file);
                } catch {
                    console.log('ERROOOOOOOOOOR');
                } finally {
                    setUploading(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    };

    const addUserInfoToFirebase = async (
        aim: IUpdateUser['aim'],
        aboutText: IUpdateUser['aboutText']
    ) => {
        try {
            const userRef = doc(db, 'users', `${id}`);

            setIsLoading(true);
            if (id) {
                const storageRef = ref(
                    storage,
                    `avatars/${user.avatar.file?.name}`
                );
                const downloadURL = await getDownloadURL(storageRef);

                if (user) {
                    await updateDoc(userRef, {
                        aim,
                        aboutText,
                        avatar: {
                            url: downloadURL,
                        },
                    });
                } else {
                    await setDoc(userRef, {
                        aim,
                        aboutText,
                    });
                }
            }
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const getUserInfoFromFirebase = async () => {
            if (id && !isEdit) {
                try {
                    setIsLoading(true);
                    const userRef = doc(db, 'users', `${id}`);
                    const docSnapshot = await getDoc(userRef);
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        const { aim, aboutText, avatar } = userData;
                        setUser({ aim, aboutText, avatar });
                        console.log(avatar);
                    }
                } finally {
                    setIsLoading(false);
                }
            }
        };

        getUserInfoFromFirebase();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit]);

    return (
        <>
            {isAuth ? (
                <ProfileContent
                    userId={id}
                    username={username}
                    isLoading={isLoading}
                    uploading={uploading}
                    userProfileData={user}
                    isEdit={isEdit}
                    handleFileChange={handleFileChange}
                    updateUser={updateUser}
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
