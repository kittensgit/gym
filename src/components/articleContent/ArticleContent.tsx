import { FC } from 'react';

import { IArticle } from 'types/articles/articles';

interface ArticleContentProps {
    articleData: IArticle;
}

const ArticleContent: FC<ArticleContentProps> = ({ articleData }) => {
    return <div>ArticleContent</div>;
};

export default ArticleContent;
