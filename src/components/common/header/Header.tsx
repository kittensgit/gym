import { FC } from 'react';
import { Link } from 'react-router-dom';

import logo from 'assets/icons/logo.png';

import styles from './Header.module.css';

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <div className="container">
                <nav className={styles.header_nav}>
                    <Link to={'/'}>
                        <span>Г</span>лавная
                    </Link>
                    <Link className={styles.header_logo} to={'/'}>
                        <img src={logo} alt="logo" />
                        <strong>
                            G<span>Y</span>M
                        </strong>
                    </Link>
                    <ul className={styles.header_list}>
                        <li>
                            <Link to={'/blog'}>
                                <span>Б</span>лог
                            </Link>
                        </li>
                        <li>
                            <Link to={'/signup'}>
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
