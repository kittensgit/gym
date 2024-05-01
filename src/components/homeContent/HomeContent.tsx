import { FC } from 'react';
import { Link } from 'react-router-dom';

import interfaceIcon from 'assets/icons/interface.png';
import communityIcon from 'assets/icons/community.png';
import protectionIcon from 'assets/icons/protection.png';
import arrowIcon from 'assets/icons/arrow.png';

import women from 'assets/women.jpg';
import men from 'assets/men.jpg';

import styles from './HomeContent.module.css';

const HomeContent: FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.home}>
                <div className="container">
                    <div className={styles.preview}>
                        <h1 className={styles.text}>
                            Get fit, <span>strong&motivated</span> with us!
                        </h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className={styles.about}>
                    <div className={styles.about_title}>
                        <div className={styles.line}></div>
                        <h2>О нас</h2>
                        <div className={styles.line}></div>
                    </div>
                    <p className={styles.about_text}>
                        Добро пожаловать в NGYMX - инновационный спортивный
                        трекер, разработанный для помощи вам достигнуть ваших
                        фитнес-целей и улучшить ваш общий образ жизни. Мы
                        стремимся стать вашим надежным спутником на пути к
                        здоровью и активности. В NGYMX мы приветствуем всех, кто
                        стремится к здоровому образу жизни, независимо от вашего
                        уровня физической подготовки или опыта в тренировках.
                        Наша миссия - вдохновить вас на достижение новых высот и
                        помочь вам преодолевать свои границы через
                        персонализированные и эффективные тренировки.
                    </p>
                    <div className={styles.benefits}>
                        <h2>
                            <span className={styles.el_sm}></span>
                            <span className={styles.el}></span>
                            Преимущества <b>NGYMX</b>
                            <span className={styles.el}></span>
                            <span className={styles.el_sm}></span>
                        </h2>
                        <div className={styles.benefits_content}>
                            <div className={styles.benefits_item}>
                                <img src={interfaceIcon} alt="interface" />
                                <h3>Доступный интерфейс</h3>
                                <p>
                                    Удобный и интуитивно понятный интерфейс
                                    делает использование трекера простым для
                                    всех уровней пользователей
                                </p>
                            </div>
                            <div className={styles.benefits_item}>
                                <img src={communityIcon} alt="community" />
                                <h3>Комьюнити</h3>
                                <p>
                                    Возможность общения с единомышленниками,
                                    обмена опытом, получения советов и мотивации
                                    от других пользователей через блог
                                </p>
                            </div>
                            <div className={styles.benefits_item}>
                                <img src={protectionIcon} alt="protection" />
                                <h3>Безопасность</h3>
                                <p>
                                    Обеспечение высокого уровня защиты данных
                                    пользователей и их конфиденциальности
                                    является ключевым аспектом любого трекера по
                                    спорту
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cards}>
                        <Link to={'/profile/1'} className={styles.card}>
                            <img src={women} alt="women" />
                            <p>
                                Get <span>fit</span>
                                <img src={arrowIcon} alt="arrow" />
                            </p>
                        </Link>
                        <Link to={'/profile/1'} className={styles.card}>
                            <img src={men} alt="men" />
                            <p>
                                Get <span>strong</span>
                                <img src={arrowIcon} alt="arrow" />
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeContent;
