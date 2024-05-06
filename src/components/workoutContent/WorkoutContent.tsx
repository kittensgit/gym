import { FC } from 'react';

import plusIcon from 'assets/icons/plus.png';

import styles from './WorkoutContent.module.css';

const WorkoutContent: FC = () => {
    return (
        <div className={styles.wrapper}>
            <button className={styles.btn}>
                <img src={plusIcon} alt="plus" />
                Добавить тренировку
            </button>
            <div className={styles.workout}>
                <div className={styles.workout_item}>
                    <h3>
                        <span>21.06.24</span> — День ног
                    </h3>
                    <button>
                        <img src={plusIcon} alt="plus" />
                        Добавить упражнение
                    </button>
                    <div className={styles.workout_exercise}>
                        <h4>Присед:</h4>
                        <div className={styles.exercise_content}>
                            <div className={styles.workout_set}>
                                <p>1 × 8</p>
                                <p>45 кг</p>
                            </div>
                            <div className={styles.workout_set}>
                                <p>1 × 8</p>
                                <p>50 кг</p>
                            </div>
                            <div className={styles.workout_set}>
                                <p>1 × 6</p>
                                <p>60 кг</p>
                            </div>
                            <button>
                                <img src={plusIcon} alt="plus" />
                                Добавить сет
                            </button>
                        </div>
                    </div>
                    <div className={styles.workout_exercise}>
                        <h4>Жим ногами:</h4>
                        <div className={styles.exercise_content}>
                            <div className={styles.workout_set}>
                                <p>1 × 8</p>
                                <p>45 кг</p>
                            </div>
                            <div className={styles.workout_set}>
                                <p>1 × 8</p>
                                <p>50 кг</p>
                            </div>
                            <div className={styles.workout_set}>
                                <p>1 × 6</p>
                                <p>60 кг</p>
                            </div>
                            <button>
                                <img src={plusIcon} alt="plus" />
                                Добавить сет
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.workout_item}>
                    <h3>
                        <span>21.06.24</span> — День ног
                    </h3>
                    <button>
                        <img src={plusIcon} alt="plus" />
                        Добавить упражнение
                    </button>
                    <div className={styles.workout_exercise}>
                        <h4>Присед:</h4>
                        <div className={styles.exercise_content}>
                            <div className={styles.workout_set}>
                                <p>1 × 8</p>
                                <p>45 кг</p>
                            </div>
                            <div className={styles.workout_set}>
                                <p>1 × 8</p>
                                <p>50 кг</p>
                            </div>
                            <div className={styles.workout_set}>
                                <p>1 × 6</p>
                                <p>60 кг</p>
                            </div>
                            <button>
                                <img src={plusIcon} alt="plus" />
                                Добавить сет
                            </button>
                        </div>
                    </div>
                    <div className={styles.workout_exercise}>
                        <h4>Жим ногами:</h4>
                        <div className={styles.exercise_content}>
                            <div className={styles.workout_set}>
                                <p>1 × 8</p>
                                <p>45 кг</p>
                            </div>
                            <div className={styles.workout_set}>
                                <p>1 × 8</p>
                                <p>50 кг</p>
                            </div>
                            <div className={styles.workout_set}>
                                <p>1 × 6</p>
                                <p>60 кг</p>
                            </div>
                            <button>
                                <img src={plusIcon} alt="plus" />
                                Добавить сет
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutContent;
