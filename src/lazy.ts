import { lazy } from 'react';

export const LazyArticlePage = lazy(() => import('pages/Article'));
export const LazyBlogPage = lazy(() => import('pages/Blog'));
export const LazyCreateArticlePage = lazy(() => import('pages/CreateArticle'));
export const LazyHomePage = lazy(() => import('pages/Home'));
export const LazyProfilePage = lazy(() => import('pages/Profile'));
export const LazySignInPage = lazy(() => import('pages/SignIn'));
export const LazySignUpPage = lazy(() => import('pages/SignUp'));
export const LazyUserArticlesPage = lazy(() => import('pages/UserArticles'));
export const LazyWorkoutPage = lazy(() => import('pages/Workout'));
