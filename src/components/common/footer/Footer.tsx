import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logoIcon from 'assets/icons/logo.png';
import instaIcon from 'assets/icons/insta.png';
import fbIcon from 'assets/icons/fb.png';
import twitterIcon from 'assets/icons/twitter.png';
import linkedinIcon from 'assets/icons/linkedin.png';

import styles from './Footer.module.css';

const Footer: FC = () => {
    const { pathname } = useLocation();
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footer_content}>
                    <div className={styles.footer_info}>
                        <Link className={styles.footer_logo} to={'/'}>
                            <img src={logoIcon} alt="logo" />
                            <strong>
                                <span>N</span>G<span>Y</span>M<span>X</span>
                            </strong>
                        </Link>
                        <div className={styles.socials}>
                            <a href="!#">
                                <img src={instaIcon} alt="insta" />
                            </a>
                            <a href="!#">
                                <img src={fbIcon} alt="fb" />
                            </a>
                            <a href="!#">
                                <img src={twitterIcon} alt="twitter" />
                            </a>
                            <a href="!#">
                                <img src={linkedinIcon} alt="linkedin" />
                            </a>
                        </div>
                    </div>
                    <ul className={styles.list}>
                        <li className={pathname === '/' ? styles.active : ''}>
                            <Link to={'/'}>
                                <span>Г</span>лавная
                            </Link>
                        </li>
                        <li
                            className={
                                pathname === '/blog' ? styles.active : ''
                            }
                        >
                            <Link to={'/blog'}>
                                <span>Б</span>лог
                            </Link>
                        </li>
                        <li
                            className={
                                pathname === '/signin' ? styles.active : ''
                            }
                        >
                            <Link to={'/signin'}>
                                <span>В</span>ойти
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
