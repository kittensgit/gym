import { FC, useState } from 'react';

import plusIcon from 'assets/icons/plus.png';

import { IExercise, ISet, IWorkout } from 'types/user/user';

import Exercise from './exercise/Exercise';
import Set from './exercise/set/Set';

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
    };

    const handleSaveExercises = () => {
        handleChangeIsAddExercise();
        const newExercise: IExercise = {
            exerciseName,
            sets: sets,
        };
        setExercises([newExercise, ...exercises]);
        setExerciseName('');
        setSets([]);
    };

    const handleSaveSet = () => {
        handleChangeIsAddSet();
        const newSet: ISet = {
            countApproaches,
            countTimes,
            weight,
        };
        setSets([...sets, newSet]);
        setCountApproaches(1);
        setCountTimes(1);
        setWeight(1);
    };

    return (
        <div className={styles.wrapper}>
            {!isAddWorkout ? (
                <button
                    onClick={handleChangeIsAddWorkout}
                    className={styles.btn_plus}
                >
                    <img src={plusIcon} alt="plus" />
                    Добавить тренировку
                </button>
            ) : (
                <div className={styles.workout_form}>
                    <div className={styles.workout_inputs}>
                        <input
                            value={dateWorkout}
                            onChange={(e) => setDateWorkout(e.target.value)}
                            type="text"
                            placeholder="Введите дату тренировки(дд/мм/гг)"
                        />
                        <input
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                            type="text"
                            placeholder="Введите название тренировки"
                        />
                    </div>
                    {!isAddExercise ? (
                        <button
                            onClick={handleChangeIsAddExercise}
                            className={styles.btn_plus}
                        >
                            <img src={plusIcon} alt="plus" />
                            Добавить упражнение
                        </button>
                    ) : (
                        <div className={styles.exercise_form}>
                            <div className={styles.exercise_form_content}>
                                <input
                                    value={exerciseName}
                                    onChange={(e) =>
                                        setExerciseName(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Введите название упражнения"
                                />
                                {!isAddSet ? (
                                    <div className={styles.set_wrapper}>
                                        {sets.map((itemSets) => (
                                            <Set set={itemSets} />
                                        ))}
                                        <button
                                            onClick={handleChangeIsAddSet}
                                            className={styles.btn_plus}
                                        >
                                            <img src={plusIcon} alt="plus" />
                                            Добавить сет
                                        </button>
                                    </div>
                                ) : (
                                    <div className={styles.set_form}>
                                        {sets.map((itemSets) => (
                                            <Set set={itemSets} />
                                        ))}
                                        <div className={styles.set_inputs}>
                                            <input
                                                value={countApproaches}
                                                onChange={(e) =>
                                                    setCountApproaches(
                                                        parseInt(
                                                            e.target.value,
                                                            10
                                                        )
                                                    )
                                                }
                                                type="number"
                                                placeholder="Подходов"
                                            />
                                            <span>×</span>
                                            <input
                                                value={countTimes}
                                                onChange={(e) =>
                                                    setCountTimes(
                                                        parseInt(
                                                            e.target.value,
                                                            10
                                                        )
                                                    )
                                                }
                                                type="number"
                                                placeholder="Повторений"
                                            />
                                            <input
                                                value={weight}
                                                onChange={(e) =>
                                                    setWeight(
                                                        parseInt(
                                                            e.target.value,
                                                            10
                                                        )
                                                    )
                                                }
                                                type="number"
                                                placeholder="Вес"
                                            />
                                        </div>
                                        <button
                                            className={styles.btn}
                                            onClick={handleSaveSet}
                                        >
                                            Применить
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button
                                className={styles.btn}
                                onClick={handleSaveExercises}
                            >
                                Добавить упражнение
                            </button>
                        </div>
                    )}
                    {exercises.map((itemExercises) => (
                        <Exercise exercise={itemExercises} />
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
                            <Exercise exercise={itemExercises} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkoutContent;
