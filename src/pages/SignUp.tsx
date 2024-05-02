import { FC, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import SignUpContent from 'components/signUpContent/SignUpContent';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';

import { setUser } from '../redux/ProfileSlice';

const SignUp: FC = () => {
    const { isAuth, id } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [errorMes, setErrorMes] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const onSignUp = async (
        username: string,
        email: string,
        password: string
    ) => {
        const auth = getAuth();

        try {
            setLoading(true);

            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            dispatch(
                setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                    username,
                })
            );

            navigate(`/profile/${user.uid}`);
        } catch (serverError: any) {
            if (serverError instanceof Error) {
                setErrorMes(serverError.message);
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
                <SignUpContent errorMessage={errorMes} onSignUp={onSignUp} />
            )}
        </div>
    );
};

export default SignUp;
