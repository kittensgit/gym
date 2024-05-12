import { FC, useState } from 'react';

import plusIcon from 'assets/icons/plus.png';

import { IExercise, IWorkout } from 'types/user/user';

import WorkoutForm from './workoutForm/WorkoutForm';
import Exercise from './exercise/Exercise';

import styles from './WorkoutContent.module.css';

interface WorkoutContentProps {
    workout: IWorkout[];
    isAddWorkout: boolean;
    isLoading: boolean;
    handleChangeIsAddWorkout: () => void;
    addWorkoutToFirebase: (
        workoutName: IWorkout['workoutName'],
        dateWorkout: IWorkout['dateWorkout'],
        exercises: IExercise[]
    ) => void;
}

const WorkoutContent: FC<WorkoutContentProps> = ({
    workout,
    isAddWorkout,
    isLoading,
    handleChangeIsAddWorkout,
    addWorkoutToFirebase,
}) => {
    const [workoutName, setWorkoutName] = useState<IWorkout['workoutName']>('');
    const [dateWorkout, setDateWorkout] = useState<IWorkout['dateWorkout']>({
        day: 1,
        month: 1,
        year: 2024,
    });

    const [saveError, setSaveError] = useState<string | null>('');

    const handleChangeWorkoutDate = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setDateWorkout((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleChangeWorkoutName = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setWorkoutName(e.target.value);
    };

    const handleSaveWorkout = async (exercises: IExercise[]) => {
        try {
            handleChangeIsAddWorkout();
            addWorkoutToFirebase(workoutName, dateWorkout, exercises);
            setWorkoutName('');
            setDateWorkout({
                day: 1,
                month: 1,
                year: 2024,
            });
        } catch (error: any) {
            if (error instanceof Error) {
                setSaveError(error.message);
            }
        }
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
                <WorkoutForm
                    workoutName={workoutName}
                    dateWorkout={dateWorkout}
                    handleChangeWorkoutDate={handleChangeWorkoutDate}
                    handleSaveWorkout={handleSaveWorkout}
                    handleChangeWorkoutName={handleChangeWorkoutName}
                />
            )}
            {isLoading ? (
                <div>Loading...</div>
            ) : saveError ? (
                <p className={styles.error}>
                    Произошла ошибка при добавлении тренировки: {saveError}
                </p>
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
