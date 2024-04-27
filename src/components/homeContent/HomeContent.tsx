import { FC } from 'react';

import styles from './HomeContent.module.css';

const HomeContent: FC = () => {
    return (
        <div className={styles.home}>
            <div className="container">
                <div className={styles.preview}>
                    <p className={styles.text}>
                        Get fit, <span>strong&motivated</span> with us!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomeContent;
