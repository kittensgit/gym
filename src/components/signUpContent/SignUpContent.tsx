import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './SignUpContent.module.css';

const SignUpContent: FC = () => {
    return (
        <div className={styles.signup_wrapper}>
            <div className={styles.signup_content}>
                <h1>Create account</h1>
                <form>
                    <input type="text" placeholder="Введите своё имя" />
                    <input type="email" placeholder="Введите свой email" />
                    <input type="password" placeholder="Введите пароль" />
                    <button>Зарегистрироваться</button>
                </form>
                <p>
                    Уже есть аккаунт? <Link to="/signin">Войдите здесь</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpContent;
