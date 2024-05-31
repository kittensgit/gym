import { FC, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';

import SignInContent from 'components/signInContent/SignInContent';

import { useAuth } from 'hooks/useAuth';
import { useLocalStorage } from 'hooks/useLocalStorage';

import { IUser } from 'types/user/user';

const SignIn: FC = () => {
    const [_, setUser] = useLocalStorage('user', {});

    const auth = getAuth();
    const { isAuth, id } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onSignIn = (email: IUser['email'], password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                setLoading(true);
                setUser({
                    email: user.email,
                    username: user.displayName,
                    id: user.uid,
                    token: user.refreshToken,
                });
                navigate(`/profile/${id}`);
            })
            .catch((error: any) => {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(({ user }) => {
                setLoading(true);
                setUser({
                    email: user.email,
                    username: user.displayName,
                    id: user.uid,
                    token: user.refreshToken,
                });
            })
            .catch((error: any) => {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                }
            })
            .finally(() => {
                setLoading(false);
            });
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
