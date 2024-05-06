import { FC } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

import bg from 'assets/back.jpg';
import ava from 'assets/avam.jpg';

import { IUser } from 'types/user/user';

import styles from './ProfileContent.module.css';

interface ProfileContentProps {
    username: IUser['username'];
    userId: IUser['id'];
}

const ProfileContent: FC<ProfileContentProps> = ({ username, userId }) => {
    const { pathname } = useLocation();
    console.log(pathname);
    return (
        <div className={styles.wrapper}>
            <img className={styles.bg} src={bg} alt="bg" />
            <div className="container">
                <div className={styles.profile}>
                    <div className={styles.info}>
                        <img src={ava} alt="avatar" />
                        <div className={styles.about}>
                            <h1>{username}</h1>
                            <p>Набор мышечной массы</p>
                        </div>
                    </div>
                    <div className={styles.text}>
                        <h2>О себе</h2>
                        <p>
                            Я - спортсменка, зажигающая на поле и вне его. Моя
                            страсть к активному образу жизни и стремление к
                            постоянному совершенствованию формируют мою
                            идентичность. Я наслаждаюсь каждым моментом, когда
                            мои мышцы напрягаются и сердце бьется в такт ритму
                            спорта. Каждый вызов - это возможность показать свою
                            силу и выносливость.
                        </p>
                    </div>
                    <div className={styles.links}>
                        <Link
                            className={
                                pathname === `/profile/${userId}`
                                    ? styles.active
                                    : ''
                            }
                            to={''}
                        >
                            Тренировки
                        </Link>
                        <a href="!#">Фото</a>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;
