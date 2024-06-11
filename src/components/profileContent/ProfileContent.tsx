import React, { ChangeEvent, FC, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import Loading from 'components/common/loading/Loading';

import avaIcon from 'assets/icons/ava.png';
import editIcon from 'assets/icons/edit.png';
import logoutIcon from 'assets/icons/logout.png';

import { IUser } from 'types/user/user';

import styles from './ProfileContent.module.css';

interface IUserProfileData {
    aim: IUser['aim'];
    aboutText: IUser['aboutText'];
}

interface ProfileContentProps {
    username: IUser['username'];
    userProfileData: IUserProfileData;
    isLoading: boolean;
    isEdit: boolean;
    isUploading: boolean;
    avatarUrl: IUser['avatarUrl'];
    userId: string;
    uploadAvatarInStorage: (file: File) => void;
    updateUser: (name: string, value: string) => void;
    toggleEdit: () => void;
    addUserInfoToFirebase: (
        aim: IUser['aim'],
        aboutText: IUser['aboutText'],
        avatarUrl: IUser['avatarUrl']
    ) => void;
    onLogOut: () => void;
}

const ProfileContent: FC<ProfileContentProps> = ({
    userId,
    username,
    isLoading,
    userProfileData,
    isEdit,
    avatarUrl,
    isUploading,
    uploadAvatarInStorage,
    updateUser,
    toggleEdit,
    addUserInfoToFirebase,
    onLogOut,
}) => {
    const { pathname } = useLocation();
    const inputRef = useRef<HTMLInputElement | null>(null);

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
        addUserInfoToFirebase(
            userProfileData.aim,
            userProfileData.aboutText,
            avatarUrl
        );
    };

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            uploadAvatarInStorage(file);
        }
    };

    const handleClickInput = () => isEdit && inputRef.current?.click();

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <div className={styles.profile}>
                    <div className={styles.info}>
                        <div className={styles.info_content}>
                            <div
                                className={styles.avatarContainer}
                                onClick={handleClickInput}
                            >
                                {isLoading || isUploading ? (
                                    <Loading />
                                ) : (
                                    <>
                                        <img
                                            className={
                                                isEdit
                                                    ? styles.ava +
                                                      ' ' +
                                                      styles.ava_edit
                                                    : styles.ava
                                            }
                                            src={
                                                avatarUrl ? avatarUrl : avaIcon
                                            }
                                            alt="avatar"
                                        />
                                        {isEdit && (
                                            <div
                                                className={styles.plusIcon}
                                            ></div>
                                        )}
                                    </>
                                )}
                            </div>
                            <input
                                ref={inputRef}
                                onChange={handleChangeFile}
                                type="file"
                                hidden
                            />
                            {isEdit ? (
                                <div className={styles.about}>
                                    <h1>
                                        {username
                                            .split(' ')
                                            .map((item, index) => (
                                                <div key={index}>
                                                    <span>
                                                        {item.charAt(0)}
                                                    </span>
                                                    {item.slice(1)}
                                                </div>
                                            ))}
                                    </h1>
                                    <input
                                        className={styles.input}
                                        value={userProfileData.aim}
                                        onChange={handleChange}
                                        name="aim"
                                        type="text"
                                        placeholder="Введите свою цель"
                                    />
                                </div>
                            ) : (
                                <div className={styles.about}>
                                    <h1>
                                        {username
                                            .split(' ')
                                            .map((item, index) => (
                                                <div key={index}>
                                                    <span>
                                                        {item.charAt(0)}
                                                    </span>
                                                    {item.slice(1)}
                                                </div>
                                            ))}
                                    </h1>
                                    {isLoading ? (
                                        <Loading />
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
                            <div className={styles.btns}>
                                <button
                                    onClick={toggleEdit}
                                    className={styles.edit}
                                >
                                    <img src={editIcon} alt="edit" />
                                </button>
                                <button
                                    onClick={onLogOut}
                                    className={styles.logout}
                                >
                                    Выйти
                                    <img src={logoutIcon} alt="logout" />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={styles.profile_content}>
                        <div className={styles.text}>
                            <h2>О себе</h2>
                            {isEdit ? (
                                <textarea
                                    className={styles.textarea}
                                    value={userProfileData.aboutText}
                                    name="aboutText"
                                    onChange={handleChange}
                                    placeholder="Напишите о себе и о своих достижениях"
                                ></textarea>
                            ) : isLoading ? (
                                <Loading />
                            ) : (
                                <p>
                                    {userProfileData.aboutText
                                        ? userProfileData.aboutText
                                        : 'Нет информации о себе'}
                                </p>
                            )}
                            {isEdit && (
                                <button
                                    className={styles.btn}
                                    onClick={onSaveEdit}
                                >
                                    Применить изменения
                                </button>
                            )}
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
                            <Link
                                className={
                                    pathname === `/profile/${userId}/articles`
                                        ? styles.active
                                        : ''
                                }
                                to="articles"
                            >
                                Статьи
                            </Link>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;
