import { FC, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import SignInContent from 'components/signInContent/SignInContent';

import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/useAppDispatch';

import { IUser } from 'types/user/user';

import { setUser } from '../redux/ProfileSlice';

const SignIn: FC = () => {
    const { isAuth, id } = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onSignIn = (email: IUser['email'], password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                setLoading(true);
                dispatch(
                    setUser({
                        email: user.email,
                        username: user.displayName,
                        id: user.uid,
                        token: user.refreshToken,
                    })
                );
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

    return (
        <div className="container">
            {loading ? (
                <div>Loading...</div>
            ) : isAuth ? (
                <Navigate replace to={`/profile/${id}`} />
            ) : (
                <SignInContent
                    errorMessage={errorMessage}
                    onSignIn={onSignIn}
                />
            )}
        </div>
    );
};

export default SignIn;
