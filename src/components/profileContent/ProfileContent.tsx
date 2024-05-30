import React, { ChangeEvent, FC, useRef } from 'react';

import Workout from 'pages/Workout';

import ava from 'assets/ava.png';
import editIcon from 'assets/icons/edit.png';

import { IUpdateUser, IUser } from 'types/user/user';

import styles from './ProfileContent.module.css';

interface ProfileContentProps {
    username: IUser['username'];
    userProfileData: IUpdateUser;
    isLoading: boolean;
    isEdit: boolean;
    isUploading: boolean;
    avatarUrl: string;
    uploadAvatarInStorage: (file: File) => void;
    updateUser: (name: string, value: string) => void;
    toggleEdit: () => void;
    addUserInfoToFirebase: (
        aim: IUpdateUser['aim'],
        aboutText: IUpdateUser['aboutText'],
        avatarUrl?: IUser['avatarUrl']
    ) => void;
}

const ProfileContent: FC<ProfileContentProps> = ({
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
}) => {
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

    const handleClickInput = () => inputRef.current?.click();

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <div className={styles.profile}>
                    <div className={styles.info}>
                        <div className={styles.info_content}>
                            {isLoading ? (
                                <div>Loading...</div>
                            ) : isUploading ? (
                                <div>Uploading...</div>
                            ) : (
                                <img
                                    onClick={handleClickInput}
                                    src={avatarUrl ? avatarUrl : ava}
                                    alt="avatar"
                                />
                            )}
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
                                className={styles.textarea}
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
                        {isEdit && (
                            <button className={styles.btn} onClick={onSaveEdit}>
                                Применить изменения
                            </button>
                        )}
                    </div>
                    <Workout />
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;
