import { FC, useState } from 'react';

import { IExercise, ISet, IWorkout } from 'types/user/user';

import plusIcon from 'assets/icons/plus.png';

import Exercises from '../exercise/Exercise';
import Sets from '../exercise/set/Set';

import styles from './WorkoutForm.module.css';

interface WorkoutFormProps {
    dateWorkout: IWorkout['dateWorkout'];
    workoutName: IWorkout['workoutName'];
    handleChangeWorkoutDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeWorkoutName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSaveWorkout: (exercises: IExercise[]) => void;
}

const WorkoutForm: FC<WorkoutFormProps> = ({
    dateWorkout,
    workoutName,
    handleChangeWorkoutDate,
    handleChangeWorkoutName,
    handleSaveWorkout,
}) => {
    const [exercises, setExercises] = useState<IExercise[]>([]);
    const [sets, setSets] = useState<ISet[]>([]);

    const [isAddExercise, setIsAddExercise] = useState<boolean>(false);
    const [isAddSet, setIsAddSet] = useState<boolean>(false);

    const [exerciseName, setExerciseName] = useState<string>('');

    const [countApproaches, setCountApproaches] = useState<number>(1);
    const [countTimes, setCountTimes] = useState<number>(1);
    const [weight, setWeight] = useState<number>(1);

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

    return (
        <div className={styles.workout_form}>
            <div className={styles.workout_inputs}>
                <div className={styles.inputs_date}>
                    <input
                        value={dateWorkout.day}
                        onChange={handleChangeWorkoutDate}
                        type="number"
                        name="day"
                        placeholder="День"
                    />
                    <input
                        value={dateWorkout.month}
                        onChange={handleChangeWorkoutDate}
                        type="number"
                        name="month"
                        placeholder="Месяц"
                    />
                    <input
                        value={dateWorkout.year}
                        onChange={handleChangeWorkoutDate}
                        type="number"
                        name="year"
                        placeholder="Год"
                    />
                </div>
                <input
                    value={workoutName}
                    onChange={handleChangeWorkoutName}
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
                            onChange={(e) => setExerciseName(e.target.value)}
                            type="text"
                            placeholder="Введите название упражнения"
                        />
                        {!isAddSet ? (
                            <div className={styles.set_wrapper}>
                                {sets.map((itemSets) => (
                                    <Sets set={itemSets} />
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
                                    <Sets set={itemSets} />
                                ))}
                                <div className={styles.set_inputs}>
                                    <input
                                        value={countApproaches}
                                        onChange={(e) =>
                                            setCountApproaches(
                                                parseInt(e.target.value, 10)
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
                                                parseInt(e.target.value, 10)
                                            )
                                        }
                                        type="number"
                                        placeholder="Повторений"
                                    />
                                    <input
                                        value={weight}
                                        onChange={(e) =>
                                            setWeight(
                                                parseInt(e.target.value, 10)
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
                <Exercises exercise={itemExercises} />
            ))}
            <button
                onClick={() => handleSaveWorkout(exercises)}
                className={styles.btn}
            >
                Добавить тренировку
            </button>
        </div>
    );
};

export default WorkoutForm;
