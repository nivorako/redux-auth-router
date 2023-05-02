import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux"
import { db } from "../firebase-config";

export function Home(){
    const { currentUser } = useSelector((store) => store.auth)
    
    const [users, setUsers] = useState([])

    useEffect(()=> {
        const unsuscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            const usersData = snapshot.docs.map(doc => doc.data())
            setUsers(usersData)
        })
        return unsuscribe
    }, [])
   //console.log('users :', users[0].firstName)
    return(
        <div className="home">
            {currentUser ? (
                    <h1 className="home-title"> bonjour {currentUser.email.split("@")[0].split(".")[0]}</h1>            
            ) : (
                <h1 className="home-title">Bienvenu (e)</h1>
            )}
            <div className="home-infos">
                {users.map((user, index) => {
                    return  (
                            <div className="home-info" key={index}>
                                <p>Nom : <span>{user.firstName} </span></p>
                                <p>prénom : <span>{user.lastName} </span></p>
                                <p>localisation : <span>{user.location} </span></p>    
                            </div>
                            )
                })}
            </div>
        </div>
    )
}