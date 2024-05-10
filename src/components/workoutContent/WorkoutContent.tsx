import { FC, useEffect, useState } from 'react';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';

import plusIcon from 'assets/icons/plus.png';

import { IExercise, ISet, IWorkout } from 'types/user/user';
import { useAuth } from 'hooks/useAuth';

import Exercise from './exercise/Exercise';
import Set from './exercise/set/Set';

import styles from './WorkoutContent.module.css';

const WorkoutContent: FC = () => {
    const { id } = useAuth();
    const db = getFirestore();
    const workoutRef = collection(db, 'users', `${id}`, 'workouts');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [workout, setWorkout] = useState<IWorkout[]>([]);
    const [exercises, setExercises] = useState<IExercise[]>([]);
    const [sets, setSets] = useState<ISet[]>([]);

    const [isAddWorkout, setIsAddWorkout] = useState<boolean>(false);
    const [isAddExercise, setIsAddExercise] = useState<boolean>(false);
    const [isAddSet, setIsAddSet] = useState<boolean>(false);

    const [workoutName, setWorkoutName] = useState<IWorkout['workoutName']>('');
    const [dateWorkout, setDateWorkout] = useState<IWorkout['dateWorkout']>({
        day: 1,
        month: 1,
        year: 2024,
    });

    const [exerciseName, setExerciseName] = useState<string>('');

    const [countApproaches, setCountApproaches] = useState<number>(1);
    const [countTimes, setCountTimes] = useState<number>(1);
    const [weight, setWeight] = useState<number>(1);

    useEffect(() => {
        const getWorkoutList = async () => {
            try {
                setIsLoading(true);
                const data = await getDocs(workoutRef);
                const filteredData: IWorkout[] = data.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        workoutName: data.workoutName,
                        dateWorkout: data.dateWorkout,
                        exercises: data.exercises,
                    };
                });
                const sortedDataByDate = filteredData.sort((w1, w2) => {
                    const dateW1 = new Date(
                        w1.dateWorkout.year,
                        w1.dateWorkout.month - 1,
                        w1.dateWorkout.day
                    );
                    const dateW2 = new Date(
                        w2.dateWorkout.year,
                        w2.dateWorkout.month - 1,
                        w2.dateWorkout.day
                    );
                    return dateW1.getTime() - dateW2.getTime();
                });
                setWorkout(sortedDataByDate);
            } catch (error) {
                console.error('ERROR');
            } finally {
                setIsLoading(false);
            }
        };
        getWorkoutList();
    }, [isAddWorkout]);

    const handleChangeIsAddWorkout = () => {
        setIsAddWorkout(!isAddWorkout);
    };
    const handleChangeIsAddExercise = () => {
        setIsAddExercise(!isAddExercise);
    };
    const handleChangeIsAddSet = () => {
        setIsAddSet(!isAddSet);
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

    const handleSaveWorkout = async () => {
        try {
            handleChangeIsAddWorkout();
            await addDoc(workoutRef, {
                workoutName,
                dateWorkout,
                exercises,
            });
            setWorkoutName('');
            setDateWorkout({
                day: 1,
                month: 1,
                year: 2024,
            });
            setExercises([]);
        } catch (error) {
            console.error('ERROR');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDateWorkout((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
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
                        <div className={styles.inputs_date}>
                            <input
                                value={dateWorkout.day}
                                onChange={handleChange}
                                type="number"
                                name="day"
                                placeholder="День"
                            />
                            <input
                                value={dateWorkout.month}
                                onChange={handleChange}
                                type="number"
                                name="month"
                                placeholder="Месяц"
                            />
                            <input
                                value={dateWorkout.year}
                                onChange={handleChange}
                                type="number"
                                name="year"
                                placeholder="Год"
                            />
                        </div>
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
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className={styles.workout}>
                    {workout.map((itemWorkout) => (
                        <div className={styles.workout_item}>
                            <h3>
                                <span>{itemWorkout.dateWorkout.day}/</span>
                                <span>{itemWorkout.dateWorkout.month}/</span>
                                <span>
                                    {String(itemWorkout.dateWorkout.year).slice(
                                        2
                                    )}
                                </span>
                                — {itemWorkout.workoutName}
                            </h3>
                            {itemWorkout.exercises.map((itemExercises) => (
                                <Exercise exercise={itemExercises} />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WorkoutContent;
