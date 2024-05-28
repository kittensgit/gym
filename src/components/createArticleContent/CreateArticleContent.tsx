import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import SimpleMdeReact from 'react-simplemde-editor';

import imgIcon from 'assets/icons/img.png';

import { IArticle } from 'types/articles/articles';
import { formatDate } from 'helpers/formatDate';

import styles from './CreateArticleContent.module.css';

interface CreateArticleContentProps {
    addArticleToFirebase: (article: IArticle) => void;
}

const CreateArticleContent: FC<CreateArticleContentProps> = ({
    addArticleToFirebase,
}) => {
    const [md, setMd] = useState<string>('');
    const [article, setArticle] = useState({
        name: '',
        description: '',
    });

    const options = useMemo(
        () => ({
            spellChecker: false,
            autofocus: true,
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
            };
            addArticleToFirebase(newArticle);
            setArticle({
                name: '',
                description: '',
            });
            setMd('');
        }
    };

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
                <div className={styles.select_img}>
                    <img src={imgIcon} alt="img" />
                    <p>SELECT IMAGE</p>
                </div>
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
