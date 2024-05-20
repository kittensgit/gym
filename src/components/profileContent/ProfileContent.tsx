import React, { FC, useRef } from 'react';
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
    uploading: boolean;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
    uploading,
    handleFileChange,
    updateUser,
    toggleEdit,
    addUserInfoToFirebase,
}) => {
    const { pathname } = useLocation();

    console.log(userProfileData.avatar?.url.slice(0, 100));

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

    // const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // const [preview, setPreview] = useState<string | null>(null);
    // const [uploading, setUploading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // const handleAdd = async () => {
    //     if (!selectedFile) return;

    //     const storage = getStorage();
    //     const db = getFirestore();

    //     setUploading(true);
    //     setError(null);

    //     try {
    //         const storageRef = ref(storage, `avatars/${selectedFile.name}`);
    //         const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    //         uploadTask.on(
    //             'state_changed',
    //             (snapshot) => {
    //                 // Можно добавить логику для отображения прогресса загрузки
    //             },
    //             (error) => {
    //                 console.error('Ошибка загрузки:', error);
    //                 setError('Ошибка загрузки файла');
    //                 setUploading(false);
    //             },
    //             async () => {
    //                 try {
    //                     const downloadURL = await getDownloadURL(
    //                         uploadTask.snapshot.ref
    //                     );
    //                     console.log('Файл доступен по URL:', downloadURL);

    //                     const userDocRef = doc(db, 'users', `${userId}`);
    //                     await updateDoc(userDocRef, {
    //                         avaImg: downloadURL,
    //                     });

    //                     console.log(
    //                         'Ссылка на изображение успешно сохранена в Firestore'
    //                     );
    //                 } catch (firestoreError) {
    //                     console.error(
    //                         'Ошибка при обновлении Firestore:',
    //                         firestoreError
    //                     );
    //                     setError('Ошибка при обновлении Firestore');
    //                 } finally {
    //                     setUploading(false);
    //                     setSelectedFile(null);
    //                     setPreview(null);
    //                 }
    //             }
    //         );
    //     } catch (uploadError) {
    //         console.error('Ошибка при загрузке файла:', uploadError);
    //         setError('Ошибка при загрузке файла');
    //         setUploading(false);
    //     }
    // };

    // console.log('ERROR', error);

    const handleContainerClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         setSelectedFile(file);
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPreview(reader.result as string);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <div className={styles.profile}>
                    <div className={styles.info}>
                        <div className={styles.bg}>
                            <img src={bg} alt="bg" />
                        </div>
                        <div className={styles.info_content}>
                            <div onClick={handleContainerClick}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                />
                                {uploading ? (
                                    <div>Upload...</div>
                                ) : (
                                    <img
                                        src={
                                            userProfileData.avatar?.url
                                                ? userProfileData.avatar.url
                                                : ava
                                        }
                                        alt="avatar"
                                        style={{ cursor: 'pointer' }}
                                    />
                                )}
                            </div>
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
