import { Timestamp } from 'firebase/firestore';

export interface IArticle {
    id: string;
    name: string;
    description: string;
    content: string;
    image?: string;
    createdAt: {
        date: Date | Timestamp;
        formatedDate: string;
    };
    user: {
        username: string;
        avatarUrl?: string;
    };
}
