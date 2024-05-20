import React from "react";
import {Route, Routes} from "react-router-dom";
import ProjectMain from "./views/ProjectMain";

export default function Routing(){
    return (
        <div>
            <div style={{ marginTop: '90px' }}>
                <Routes>
                    <Route path='/' element={<ProjectMain/>} />
                </Routes>
            </div>
        </div>
    )
}