export interface IArticle {
    id: string;
    name: string;
    description: string;
    content: string;
    createdAt: {
        date: Date;
        formatedDate: string;
    };
}
