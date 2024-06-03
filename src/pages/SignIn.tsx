import { FC, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

import SignInContent from 'components/signInContent/SignInContent';

import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { IUser } from 'types/user/user';

import { setUser } from '../redux/ProfileSlice';

const SignIn: FC = () => {
    const auth = getAuth();
    const db = getFirestore();
    const { isAuth, id } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onSignIn = async (email: IUser['email'], password: string) => {
        try {
            setLoading(true);

            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log(user);
            const userRef = doc(db, 'users', `${user.uid}`);
            const docSnapshot = await getDoc(userRef);

            const userInfo = {
                email: user.email,
                token: user.refreshToken,
                id: user.uid,
                username: user.displayName,
            };

            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                const { avatarUrl } = userData as IUser;

                dispatch(
                    setUser({
                        ...userInfo,
                        avatarUrl: avatarUrl,
                    })
                );
            } else {
                dispatch(setUser(userInfo));
            }
            navigate(`/profile/${user.uid}`);
        } catch (error: any) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const onGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);

            const userRef = doc(db, 'users', `${user.uid}`);
            const docSnapshot = await getDoc(userRef);

            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                const { avatarUrl } = userData as IUser;

                dispatch(
                    setUser({
                        email: user.email,
                        username: user.displayName,
                        id: user.uid,
                        token: user.refreshToken,
                        avatarUrl: avatarUrl,
                    })
                );
            }
        } catch (error: any) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            {loading ? (
                <div>Loading...</div>
            ) : isAuth ? (
                <Navigate replace to={`/profile/${id}`} />
            ) : (
                <SignInContent
                    onGoogleSignIn={onGoogleSignIn}
                    errorMessage={errorMessage}
                    onSignIn={onSignIn}
                />
            )}
        </div>
    );
};

export default SignIn;
