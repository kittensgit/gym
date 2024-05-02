import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { IUser } from 'types/user/user';

import googleIcon from 'assets/icons/google.png';

import styles from './SignInContent.module.css';

interface SignInContentProps {
    errorMessage: string;
    onGoogleSignIn: () => void;
    onSignIn: (email: IUser['email'], password: string) => void;
}

interface ISignInFormData {
    email: IUser['email'];
    password: string;
}

const SignInContent: FC<SignInContentProps> = ({
    errorMessage,
    onSignIn,
    onGoogleSignIn,
}) => {
    const [formData, setFormData] = useState<ISignInFormData>({
        email: '',
        password: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, password } = formData;
        onSignIn(email, password);
    };
    return (
        <div className={styles.signin_wrapper}>
            <div className={styles.signin_content}>
                <h1>Welcome Back!</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        value={formData.email}
                        name="email"
                        type="email"
                        placeholder="Введите свой email"
                        onChange={handleChange}
                    />
                    <input
                        value={formData.password}
                        name="password"
                        type="password"
                        placeholder="Введите пароль"
                        onChange={handleChange}
                    />
                    <button type="submit">Войти</button>
                </form>
                <button className={styles.google} onClick={onGoogleSignIn}>
                    <img src={googleIcon} alt="google" />
                    Войти с помощью Google
                </button>
                <p>
                    Нет аккаунта? <Link to="/signup">Создайте его здесь</Link>
                </p>
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default SignInContent;
