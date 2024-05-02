import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { IUser } from 'types/user/user';

import styles from './SignUpContent.module.css';

interface SignUpContentProps {
    errorMessage: string;
    onSignUp: (
        username: IUser['username'],
        email: IUser['email'],
        password: string
    ) => void;
}

interface ISignUpFormData {
    username: IUser['username'];
    email: IUser['email'];
    password: string;
}

const SignUpContent: FC<SignUpContentProps> = ({ onSignUp, errorMessage }) => {
    const [formData, setFormData] = useState<ISignUpFormData>({
        username: '',
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

        const { username, email, password } = formData;
        onSignUp(username, email, password);
    };

    return (
        <div className={styles.signup_wrapper}>
            <div className={styles.signup_content}>
                <h1>Create account</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        value={formData.username}
                        type="text"
                        name="username"
                        placeholder="Введите своё имя"
                        onChange={handleChange}
                    />
                    <input
                        value={formData.email}
                        type="email"
                        name="email"
                        placeholder="Введите свой email"
                        onChange={handleChange}
                    />
                    <input
                        value={formData.password}
                        type="password"
                        name="password"
                        placeholder="Введите пароль"
                        onChange={handleChange}
                    />
                    <button type="submit">Зарегистрироваться</button>
                </form>
                <p>
                    Уже есть аккаунт? <Link to="/signin">Войдите здесь</Link>
                </p>
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default SignUpContent;
