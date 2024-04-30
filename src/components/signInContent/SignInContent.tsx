import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './SignInContent.module.css';

const SignInContent: FC = () => {
    return (
        <div className="container">
            <div className={styles.signin_wrapper}>
                <div className={styles.signin_content}>
                    <h1>Welcome Back!</h1>
                    <form>
                        <input placeholder="Введите свой email" />
                        <input placeholder="Введите пароль" />
                        <button>Войти</button>
                    </form>
                    <p>
                        Нет аккаунта?{' '}
                        <Link to="/signup">Создайте его здесь</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInContent;
