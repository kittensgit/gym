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

const Profile: FC = () => {
    const { isAuth, username, id, avatarUrl } = useAuth();
    const db = getFirestore();

    const [user, setUser] = useState<IUpdateUser>({
        aim: '',
        aboutText: '',
    });

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getUserInfoFromFirebase = async () => {
            if (id && !isEdit) {
                try {
                    setIsLoading(true);
                    const userRef = doc(db, 'users', `${id}`);
                    const docSnapshot = await getDoc(userRef);
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        const { aim, aboutText } = userData;
                        setUser({ aim, aboutText });
                    }
                } finally {
                    setIsLoading(false);
                }
            }
        };

        getUserInfoFromFirebase();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit]);

    const updateUser = (name: string, value: string) => {
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
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
                if (user) {
                    await updateDoc(userRef, {
                        aim,
                        aboutText,
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

    return (
        <>
            {isAuth ? (
                <ProfileContent
                    userId={id}
                    username={username}
                    userProfileData={user}
                    avatarUrl={avatarUrl}
                    isLoading={isLoading}
                    isEdit={isEdit}
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
