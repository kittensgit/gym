import { FC } from 'react';
import { Link } from 'react-router-dom';

import typeImg from 'assets/type.jpg';
import planImg from 'assets/plan.jpg';
import krisImg from 'assets/kris.jpg';

import decorIcon from 'assets/icons/decor.png';
import arrowIcon from 'assets/icons/arrow_red.png';

import styles from './BlogContent.module.css';

const BlogContent: FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.preview}>
                <h1>
                    Добро пожаловать в блог <span>NGYMX</span>!
                </h1>
                <div className={styles.decor}>
                    <div className={styles.line}></div>
                    <img src={decorIcon} alt="decor" />
                    <div className={styles.line}></div>
                </div>
                <p>
                    Следите за новостями, советами и историями успеха с нашим
                    спортивным трекером NGYMX. Делайте каждый шаг на пути к
                    своим фитнес-целям вместе с нами!
                </p>
                <Link to={'/create'}>
                    <button className={styles.btn}>
                        Создайте свою статью
                        <img src={arrowIcon} alt="arrow" />
                    </button>
                </Link>
            </div>
            <div className={styles.articles}>
                <div className={styles.article}>
                    <img
                        className={styles.article_img}
                        src={typeImg}
                        alt="article img"
                    />
                    <h3>
                        5 способов повысить эффективность тренировок с NGYMX
                    </h3>
                    <p className={styles.article_text}>
                        Эти советы помогут вам быстрее достичь желаемых
                        результатов и сделать процесс тренировок более
                        увлекательным.
                    </p>
                    <div className={styles.author}>
                        <div className={styles.info}>
                            <img src={krisImg} alt="avatar" />
                            <h4>Крис Котов</h4>
                        </div>
                        <p className={styles.date}>Май 25, 2024</p>
                    </div>
                </div>
                <div className={styles.article}>
                    <img
                        className={styles.article_img}
                        src={planImg}
                        alt="article img"
                    />
                    <h3>Планирование тренировок</h3>
                    <p className={styles.article_text}>
                        Используйте функцию планирования тренировок в NGYMX,
                        чтобы составить расписание и придерживаться его.
                    </p>
                    <div className={styles.author}>
                        <div className={styles.info}>
                            <img src={krisImg} alt="avatar" />
                            <h4>Крис Котов</h4>
                        </div>
                        <p className={styles.date}>Май 29, 2024</p>
                    </div>
                </div>
                <div className={styles.article}>
                    <img
                        className={styles.article_img}
                        src={planImg}
                        alt="article img"
                    />
                    <h3>Планирование тренировок</h3>
                    <p className={styles.article_text}>
                        Используйте функцию планирования тренировок в NGYMX,
                        чтобы составить расписание и придерживаться его.
                    </p>
                    <div className={styles.author}>
                        <div className={styles.info}>
                            <img src={krisImg} alt="avatar" />
                            <h4>Крис Котов</h4>
                        </div>
                        <p className={styles.date}>Май 29, 2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogContent;
