export interface IUser {
    email: string;
    username: string;
    id: string;
    token: string;
}

export interface ISet {
    countApproaches: number;
    countTimes: number;
    weight: number;
}

export interface IExercise {
    exerciseName: string;
    sets: ISet[];
}

export interface IWorkout {
    workoutName: string;
    dateWorkout: string;
    exercises: IExercise[];
    id: string;
}
