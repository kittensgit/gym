import { FC, useState } from 'react';

import plusIcon from 'assets/icons/plus.png';

import { IExercise, ISet, IWorkout } from 'types/user/user';

import styles from './WorkoutContent.module.css';

const WorkoutContent: FC = () => {
    const [workout, setWorkout] = useState<IWorkout[]>([]);
    const [exercises, setExercises] = useState<IExercise[]>([]);
    const [sets, setSets] = useState<ISet[]>([]);

    const [isAddWorkout, setIsAddWorkout] = useState<boolean>(false);
    const [isAddExercise, setIsAddExercise] = useState<boolean>(false);
    const [isAddSet, setIsAddSet] = useState<boolean>(false);

    const [workoutName, setWorkoutName] = useState<string>('');
    const [dateWorkout, setDateWorkout] = useState<string>('');

    const [exerciseName, setExerciseName] = useState<string>('');

    const [countApproaches, setCountApproaches] = useState<number>(1);
    const [countTimes, setCountTimes] = useState<number>(1);
    const [weight, setWeight] = useState<number>(1);

    const handleChangeIsAddWorkout = () => {
        setIsAddWorkout(!isAddWorkout);
    };
    const handleChangeIsAddExercise = () => {
        setIsAddExercise(!isAddExercise);
    };
    const handleChangeIsAddSet = () => {
        setIsAddSet(!isAddSet);
    };

    const handleSaveWorkout = () => {
        handleChangeIsAddWorkout();
        const newWorkout: IWorkout = {
            workoutName,
            dateWorkout,
            exercises: exercises,
        };
        setWorkout([newWorkout, ...workout]);
        setWorkoutName('');
        setDateWorkout('');
        setExercises([]);
        setSets([]);
    };

    const handleSaveExercises = () => {
        handleChangeIsAddExercise();
        const newExercise: IExercise = {
            exerciseName,
            sets: sets,
        };
        setExercises([newExercise, ...exercises]);
        setExerciseName('');
    };

    const handleSaveSet = () => {
        handleChangeIsAddSet();
        const newSet: ISet = {
            countApproaches,
            countTimes,
            weight,
        };
        setSets([newSet, ...sets]);
        setCountApproaches(1);
        setCountTimes(1);
        setWeight(1);
    };

    return (
        <div className={styles.wrapper}>
            {!isAddWorkout ? (
                <button
                    onClick={handleChangeIsAddWorkout}
                    className={styles.btn}
                >
                    <img src={plusIcon} alt="plus" />
                    Добавить тренировку
                </button>
            ) : (
                <div className={styles.workout_item}>
                    <input
                        value={dateWorkout}
                        onChange={(e) => setDateWorkout(e.target.value)}
                        type="text"
                        placeholder="Введите дату тренировки"
                    />
                    <input
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        type="text"
                        placeholder="Введите название тренировки"
                    />
                    {!isAddExercise ? (
                        <button
                            onClick={handleChangeIsAddExercise}
                            className={styles.btn}
                        >
                            <img src={plusIcon} alt="plus" />
                            Добавить упражнение
                        </button>
                    ) : (
                        <div className={styles.workout_exercise}>
                            <input
                                value={exerciseName}
                                onChange={(e) =>
                                    setExerciseName(e.target.value)
                                }
                                type="text"
                                placeholder="Введите название упражнения"
                            />
                            {!isAddSet ? (
                                <button
                                    onClick={handleChangeIsAddSet}
                                    className={styles.btn}
                                >
                                    <img src={plusIcon} alt="plus" />
                                    Добавить сет
                                </button>
                            ) : (
                                <div className={styles.exercise_content}>
                                    <div className={styles.workout_set}>
                                        <input
                                            value={countApproaches}
                                            onChange={(e) =>
                                                setCountApproaches(
                                                    parseInt(e.target.value, 10)
                                                )
                                            }
                                            type="number"
                                            placeholder="количество подходов"
                                        />
                                        ×
                                        <input
                                            value={countTimes}
                                            onChange={(e) =>
                                                setCountTimes(
                                                    parseInt(e.target.value, 10)
                                                )
                                            }
                                            type="number"
                                            placeholder="количество повторений"
                                        />
                                        <input
                                            value={weight}
                                            onChange={(e) =>
                                                setWeight(
                                                    parseInt(e.target.value, 10)
                                                )
                                            }
                                            type="number"
                                            placeholder="вес"
                                        />
                                    </div>
                                    <button onClick={handleSaveSet}>
                                        Применить
                                    </button>
                                </div>
                            )}

                            {sets.map((itemSets) => (
                                <div className={styles.workout_set}>
                                    <p>
                                        {itemSets.countApproaches} ×{' '}
                                        {itemSets.countTimes}
                                    </p>
                                    <p>{itemSets.weight}</p>
                                </div>
                            ))}

                            <button onClick={handleSaveExercises}>
                                Добавить
                            </button>
                        </div>
                    )}
                    {exercises.map((itemExercises) => (
                        <div className={styles.workout_exercise}>
                            <h4>{itemExercises.exerciseName}</h4>
                            <div className={styles.exercise_content}>
                                {itemExercises.sets.map((itemSets) => (
                                    <div className={styles.workout_set}>
                                        <p>
                                            {itemSets.countApproaches} ×{' '}
                                            {itemSets.countTimes}
                                        </p>
                                        <p>{itemSets.weight} кг</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button onClick={handleSaveWorkout} className={styles.btn}>
                        Добавить тренировку
                    </button>
                </div>
            )}

            <div className={styles.workout}>
                {workout.map((itemWorkout) => (
                    <div className={styles.workout_item}>
                        <h3>
                            <span>{itemWorkout.dateWorkout}</span> —{' '}
                            {itemWorkout.workoutName}
                        </h3>
                        {itemWorkout.exercises.map((itemExercises) => (
                            <div className={styles.workout_exercise}>
                                <h4>{itemExercises.exerciseName}</h4>
                                <div className={styles.exercise_content}>
                                    {itemExercises.sets.map((itemSets) => (
                                        <div className={styles.workout_set}>
                                            <p>
                                                {itemSets.countApproaches} ×{' '}
                                                {itemSets.countTimes}
                                            </p>
                                            <p>{itemSets.weight} кг</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkoutContent;
