import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import HeroLeft09 from "./Start/HeroLeft09";
import MainHome from "./views/MainHome";
import Developer from "./views/Developer";
import MemberChange from "./views/MemberChange";
import VideoSummary from "./views/VideoSummary";
import LoadingScreen from "./components/LoadingScreen";
import VideoPreview from "./components/VideoPreview";

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
                    <Route path='/memberInfo' element={<MemberChange/>} />
                    <Route path='/summary' element={<VideoSummary/>} />
                    <Route path="/loading" element={<LoadingScreen />} />
                    <Route path="/preview" element={<VideoPreview />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
