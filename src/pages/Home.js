import React from "react";
//import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux"

export function Home(){
    const { currentUser } = useSelector((store) => store.auth)
    console.log("current : ", currentUser)
    return(
        <div>
            {currentUser ? (
                <h1> bonjour {currentUser.email.split("@")[0].split(".")[0]}</h1>
            ) : (
                <h1>Home</h1>
            )}
            
        </div>
    )
}