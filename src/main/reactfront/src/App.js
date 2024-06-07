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
import VideoShort from "./views/VideoShort";
import ShortsLoadingScreen from "./components/ShortsLoadingScreen";
import ShortsTopicSelection from "./components/ShortsTopicSelection";
import ShortsProcessingScreen from "./components/ShortsProcessing";
import ShortsVideoPreview from "./components/ShortsVideoPreview";
import Board from "./views/Board";
import BoardAdd from "./components/board/BoardAdd";
import BoardDetail from "./components/board/BoardDetail";
import BoardEdit from "./components/board/BoardEdit";
import SportsShortsLoading from "./components/SportsShortsLoading";
import SportsShortsResult from "./components/SportsShortsResult";

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
                    <Route path='/shorts' element={<VideoShort/>} />
                    <Route path="/shortsLoading" element={<ShortsLoadingScreen />} />
                    <Route path="/shortsPreview" element={<ShortsVideoPreview />} />
                    <Route path="/shortsProcessing" element={<ShortsProcessingScreen />} />
                    <Route path="/shortsTopicSelection" element={<ShortsTopicSelection />} />
                    <Route path="/board" element={<Board />} />
                    <Route path='/boardAdd' element={<BoardAdd />} />
                    <Route path="/boardDetail/:boardId" element={<BoardDetail />} />
                    <Route path="/board/edit/:boardId" element={<BoardEdit/>}/>
                    <Route path="/sportsShortsLoading" element={<SportsShortsLoading />} />
                    <Route path="/sportsShortsPreview" element={<SportsShortsResult />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
