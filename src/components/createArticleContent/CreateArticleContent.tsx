import { ChangeEvent, FC, useCallback, useMemo, useRef, useState } from 'react';
import SimpleMdeReact from 'react-simplemde-editor';

import imgIcon from 'assets/icons/img.png';

import { IArticle } from 'types/articles/articles';
import { formatDate } from 'helpers/formatDate';

import styles from './CreateArticleContent.module.css';

interface CreateArticleContentProps {
    username: string;
    articleImg: string;
    isUploading: boolean;
    avatarUrl: string | null;
    uploaodImageInStorage: (file: File) => void;
    addArticleToFirebase: (article: IArticle) => void;
}

const CreateArticleContent: FC<CreateArticleContentProps> = ({
    avatarUrl,
    username,
    articleImg,
    isUploading,
    uploaodImageInStorage,
    addArticleToFirebase,
}) => {
    const [md, setMd] = useState<string>('');
    const [article, setArticle] = useState({
        name: '',
        description: '',
    });

    const inputRef = useRef<HTMLInputElement | null>(null);

    const options = useMemo(
        () => ({
            spellChecker: false,
            autofocus: false,
            minHeight: '400px',
            placeholder: 'Введите текст статьи...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
                uniqueId: 'article-content',
            },
        }),
        []
    );

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setArticle((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onChangeMd = useCallback((value: string) => {
        setMd(value);
    }, []);

    const handleAddArticle = () => {
        if (article && md) {
            const newArticle: IArticle = {
                id: '',
                name: article.name,
                description: article.description,
                content: md,
                createdAt: {
                    date: new Date(),
                    formatedDate: formatDate(new Date()),
                },
                user: {
                    username,
                    avatarUrl,
                },
                image: articleImg,
            };
            addArticleToFirebase(newArticle);
            setArticle({
                name: '',
                description: '',
            });
            setMd('');
        }
    };

    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            uploaodImageInStorage(file);
        }
    };

    const handleInputClick = () => inputRef.current?.click();

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <div className={styles.line}></div>
                <h1>Создание статьи</h1>
                <div className={styles.line}></div>
            </div>
            <div className={styles.form}>
                <div className={styles.inputs}>
                    <input
                        value={article.name}
                        name="name"
                        type="text"
                        onChange={onChange}
                        placeholder="Название статьи"
                    />
                    <textarea
                        value={article.description}
                        name="description"
                        onChange={onChange}
                        placeholder="Краткое описание статьи..."
                    ></textarea>
                </div>

                <div onClick={handleInputClick} className={styles.select_img}>
                    {isUploading ? (
                        <div>Upload...</div>
                    ) : articleImg ? (
                        <img
                            className={styles.image}
                            src={articleImg}
                            alt="article_image"
                        />
                    ) : (
                        <>
                            <img
                                className={styles.select_icon}
                                src={imgIcon}
                                alt="img"
                            />
                            <p>SELECT IMAGE</p>
                        </>
                    )}
                </div>
                <input
                    ref={inputRef}
                    onChange={handleChangeFile}
                    type="file"
                    hidden
                />
            </div>
            <SimpleMdeReact
                className={'editor'}
                value={md}
                onChange={onChangeMd}
                options={options}
            />
            <button onClick={handleAddArticle} className={styles.btn}>
                Сохранить
            </button>
        </div>
    );
};

export default CreateArticleContent;
