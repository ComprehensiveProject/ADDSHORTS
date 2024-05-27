import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import HeroLeft09 from "./Start/HeroLeft09";
import MainHome from "./views/MainHome";
import Developer from "./views/Developer";

const App = () => {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path="/" element={<HeroLeft09 />} />
                    <Route path="/main" element={<MainHome />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/developer" element={<Developer />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
