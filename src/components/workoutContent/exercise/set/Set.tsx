import { FC } from 'react';

import { ISet } from 'types/user/user';

import styles from './Set.module.css';

interface SetsProps {
    set: ISet;
}

const Sets: FC<SetsProps> = ({ set }) => {
    return (
        <div className={styles.workout_set}>
            <p>
                {set.countApproaches} × {set.countTimes}
            </p>
            <p>{set.weight} кг</p>
        </div>
    );
};

export default Sets;
