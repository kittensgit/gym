export interface IUser {
    email: string;
    username: string;
    id: string;
    token: string;
    avatarUrl?: string;
}

export interface IUpdateUser {
    aim: string;
    aboutText: string;
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
    dateWorkout: {
        day: number;
        month: number;
        year: number;
    };
    exercises: IExercise[];
    id: string;
}
