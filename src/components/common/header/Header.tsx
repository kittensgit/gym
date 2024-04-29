import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from 'assets/icons/logo.png';

import styles from './Header.module.css';

const Header: FC = () => {
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
                        <li>
                            <Link
                                to={'/signin'}
                                className={
                                    pathname === '/signin' ? styles.active : ''
                                }
                            >
                                <span>В</span>ойти
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
