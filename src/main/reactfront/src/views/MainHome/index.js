import React, {useEffect, useState} from "react";
import Navigation from "../Navigation";
import Footer from "./Footer"
import Mainarea from "./Mainarea";
import Header from "./Header";
import '../../App.css'

export default function MainHome(){

    return (
        <div className='App'>
            <Navigation/>
            <Header/>
            <Mainarea/>
            <Footer/>
        </div>
    )
}