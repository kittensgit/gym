export interface IArticle {
    name: string;
    description: string;
    content: string;
    createdAt: {
        date: Date;
        formatedDate: string;
    };
}
