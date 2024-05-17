import { FC, useEffect, useState } from 'react';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
} from 'firebase/firestore';

import WorkoutContent from 'components/workoutContent/WorkoutContent';

import { IExercise, IWorkout } from 'types/user/user';
import { useAuth } from 'hooks/useAuth';

const Workout: FC = () => {
    const { id } = useAuth();
    const db = getFirestore();
    const workoutRef = collection(db, 'users', `${id}`, 'workout');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [workout, setWorkout] = useState<IWorkout[]>([]);

    const [isAddWorkout, setIsAddWorkout] = useState<boolean>(false);

    const handleChangeIsAddWorkout = () => {
        setIsAddWorkout(!isAddWorkout);
    };

    const addWorkoutToFirebase = async (
        workoutName: IWorkout['workoutName'],
        dateWorkout: IWorkout['dateWorkout'],
        exercises: IExercise[]
    ) => {
        await addDoc(workoutRef, {
            workoutName,
            dateWorkout,
            exercises,
        });
    };

    const getWorkoutData = async () => {
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
                return dateW2.getTime() - dateW1.getTime();
            });

            setWorkout(sortedDataByDate);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteWorkoutFromFirebase = async (workoutId: IWorkout['id']) => {
        try {
            setIsLoading(true);
            await deleteDoc(
                doc(db, 'users', `${id}`, 'workout', `${workoutId}`)
            );
            await getWorkoutData();
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getWorkoutData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAddWorkout]);

    return (
        <div>
            <WorkoutContent
                workout={workout}
                isAddWorkout={isAddWorkout}
                isLoading={isLoading}
                deleteWorkoutFromFirebase={deleteWorkoutFromFirebase}
                handleChangeIsAddWorkout={handleChangeIsAddWorkout}
                addWorkoutToFirebase={addWorkoutToFirebase}
            />
        </div>
    );
};

export default Workout;
