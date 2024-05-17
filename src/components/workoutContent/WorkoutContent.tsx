import { FC, useState } from 'react';

import plusIcon from 'assets/icons/plus.png';
import deleteIcon from 'assets/icons/trash.png';

import { IExercise, IWorkout } from 'types/user/user';

import WorkoutForm from './workoutForm/WorkoutForm';
import Exercise from './exercise/Exercise';

import styles from './WorkoutContent.module.css';

interface WorkoutContentProps {
    workout: IWorkout[];
    isAddWorkout: boolean;
    isLoading: boolean;
    handleChangeIsAddWorkout: () => void;
    deleteWorkoutFromFirebase: (id: IWorkout['id']) => void;
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
    deleteWorkoutFromFirebase,
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

    const handleRemoveWorkout = async (id: IWorkout['id']) => {
        deleteWorkoutFromFirebase(id);
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
            ) : workout.length ? (
                <div className={styles.workout}>
                    {workout.map((itemWorkout) => (
                        <div
                            key={itemWorkout.id}
                            className={styles.workout_item}
                        >
                            <div className={styles.workout_top}>
                                <h3>
                                    <span>{itemWorkout.dateWorkout.day}/</span>
                                    <span>
                                        {itemWorkout.dateWorkout.month}/
                                    </span>
                                    <span>
                                        {String(
                                            itemWorkout.dateWorkout.year
                                        ).slice(2)}
                                    </span>
                                    — {itemWorkout.workoutName}
                                </h3>
                                <button
                                    onClick={() =>
                                        handleRemoveWorkout(itemWorkout.id)
                                    }
                                    className={styles.delete}
                                >
                                    <img src={deleteIcon} alt="delete" />
                                </button>
                            </div>
                            {itemWorkout.exercises.map(
                                (itemExercises, indexEsercises) => (
                                    <Exercise
                                        key={indexEsercises}
                                        exercise={itemExercises}
                                    />
                                )
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.message}>
                    Тренировки еще не были добавлены
                </p>
            )}
        </div>
    );
};

export default WorkoutContent;
