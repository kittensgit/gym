import { FC } from 'react';

import { IExercise } from 'types/user/user';

import Set from './set/Set';

import styles from './Exercise.module.css';

interface ExercisesProps {
    exercise: IExercise;
}

const Exercises: FC<ExercisesProps> = ({ exercise }) => {
    return (
        <div className={styles.workout_exercise}>
            <h4>{exercise.exerciseName}</h4>
            <div className={styles.exercise_content}>
                {exercise.sets.map((itemSets, indexSets) => (
                    <Set key={indexSets} set={itemSets} />
                ))}
            </div>
        </div>
    );
};

export default Exercises;
