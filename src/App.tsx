import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import Blog from 'pages/Blog';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import Profile from 'pages/Profile';

const App: FC = () => {
    return (
        <div className="app">
            <main className="main_wrapper">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/profile/:userId" element={<Profile />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
