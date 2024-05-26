import { FC, useCallback, useMemo, useState } from 'react';
import SimpleMdeReact from 'react-simplemde-editor';

import imgIcon from 'assets/icons/img.png';

import styles from './CreateArticleContent.module.css';

const CreateArticleContent: FC = () => {
    const [text, setText] = useState<string>('');

    const options = useMemo(
        () => ({
            spellChecker: false,
            autofocus: true,
            minHeight: '400px',
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
                uniqueId: 'article-content',
            },
        }),
        []
    );

    const onChange = useCallback((value: string) => {
        setText(value);
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <div className={styles.line}></div>
                <h1>Создание статьи</h1>
                <div className={styles.line}></div>
            </div>
            <div className={styles.form}>
                <div className={styles.inputs}>
                    <input placeholder="Название статьи" />
                    <textarea placeholder="Краткое описание статьи..."></textarea>
                </div>
                <div className={styles.select_img}>
                    <img src={imgIcon} alt="img" />
                    <p>SELECT IMAGE</p>
                </div>
            </div>
            <SimpleMdeReact
                className={'editor'}
                value={text}
                onChange={onChange}
                options={options}
            />
        </div>
    );
};

export default CreateArticleContent;
