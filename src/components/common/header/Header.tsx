import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from 'assets/icons/logo.png';
import avaIcon from 'assets/icons/ava.png';

import { IUser } from 'types/user/user';

import styles from './Header.module.css';

interface HeaderProps {
    isAuth: boolean;
    userId: IUser['id'];
    avatarUrl: IUser['avatarUrl'];
}

const Header: FC<HeaderProps> = ({ isAuth, userId, avatarUrl }) => {
    const { pathname } = useLocation();
    return (
        <header className={styles.header}>
            <div className="container">
                <nav className={styles.header_nav}>
                    <Link
                        to={'/'}
                        className={pathname === '/' ? styles.active : ''}
                    >
                        <span>Г</span>лавная
                    </Link>
                    <Link className={styles.header_logo} to={'/'}>
                        <img src={logo} alt="logo" />
                        <strong>
                            <span>N</span>G<span>Y</span>M<span>X</span>
                        </strong>
                    </Link>
                    <ul className={styles.header_list}>
                        <li>
                            <Link
                                to={'/blog'}
                                className={
                                    pathname === '/blog' ? styles.active : ''
                                }
                            >
                                <span>Б</span>лог
                            </Link>
                        </li>
                        {isAuth ? (
                            <li>
                                <Link
                                    className={
                                        pathname === `/profile/${userId}`
                                            ? styles.active
                                            : ''
                                    }
                                    to={`/profile/${userId}`}
                                >
                                    <img
                                        className={styles.ava}
                                        src={avatarUrl ? avatarUrl : avaIcon}
                                        alt="ava"
                                    />
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    className={
                                        pathname === ('/signin' || '/signup')
                                            ? styles.active
                                            : ''
                                    }
                                    to={'/signin'}
                                >
                                    <span>В</span>ойти
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
