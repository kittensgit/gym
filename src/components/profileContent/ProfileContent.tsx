import React, { FC } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

import bg from 'assets/back.jpg';
import ava from 'assets/avam.jpg';
import editIcon from 'assets/icons/edit.png';

import { IUpdateUser, IUser } from 'types/user/user';

import styles from './ProfileContent.module.css';

interface ProfileContentProps {
    username: IUser['username'];
    userId: IUser['id'];
    isLoading: boolean;
    userProfileData: IUpdateUser;
    isEdit: boolean;
    updateUser: (name: string, value: string) => void;
    toggleEdit: () => void;
    addUserInfoToFirebase: (
        aim: IUpdateUser['aim'],
        aboutText: IUpdateUser['aboutText']
    ) => void;
}

const ProfileContent: FC<ProfileContentProps> = ({
    username,
    userId,
    isLoading,
    userProfileData,
    isEdit,
    updateUser,
    toggleEdit,
    addUserInfoToFirebase,
}) => {
    const { pathname } = useLocation();

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        updateUser(name, value);
    };

    const onSaveEdit = () => {
        toggleEdit();
        addUserInfoToFirebase(userProfileData.aim, userProfileData.aboutText);
    };

    return (
        <div className={styles.wrapper}>
            <img className={styles.bg} src={bg} alt="bg" />
            <div className="container">
                <div className={styles.profile}>
                    <div className={styles.info}>
                        <div className={styles.info_content}>
                            <img src={ava} alt="avatar" />
                            {isEdit ? (
                                <div className={styles.about}>
                                    <h1>{username}</h1>
                                    <input
                                        value={userProfileData.aim}
                                        onChange={handleChange}
                                        name="aim"
                                        type="text"
                                        placeholder="Введите свою цель"
                                    />
                                </div>
                            ) : (
                                <div className={styles.about}>
                                    <h1>{username}</h1>
                                    {isLoading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        <p>
                                            {userProfileData.aim
                                                ? userProfileData.aim
                                                : 'Цель еще не была добавлена'}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                        {!isEdit && (
                            <button
                                onClick={toggleEdit}
                                className={styles.edit}
                            >
                                <img src={editIcon} alt="edit" />
                            </button>
                        )}
                    </div>
                    <div className={styles.text}>
                        <h2>О себе</h2>
                        {isEdit ? (
                            <textarea
                                value={userProfileData.aboutText}
                                name="aboutText"
                                onChange={handleChange}
                                placeholder="Напишите о себе и о своих достижениях"
                            ></textarea>
                        ) : isLoading ? (
                            <div>Loading...</div>
                        ) : (
                            <p>
                                {userProfileData.aboutText
                                    ? userProfileData.aboutText
                                    : 'Нет информации о себе'}
                            </p>
                        )}
                    </div>
                    {isEdit && (
                        <button onClick={onSaveEdit}>
                            Применить изменения
                        </button>
                    )}
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
