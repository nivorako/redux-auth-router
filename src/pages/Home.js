import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux"
import { db } from "../firebase-config";
import { Heart } from "../icons"; 

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
   console.log('users :', users)
    return(
        <div className="home">
            <h1 className="home-title">Bienvenu (e)</h1>
            <div className="home-infos">
                {users.map((user, index) => {
                    return  (
                            <div className="home-info" key={index}>
                                <img src={user.photo} alt="voiture" />
                                <div className="home-infoDetails">
                                    <div>
                                        <p>Nom : <span>{user.nom} </span></p>
                                        <p>Catégorie : <span>{user.catégorie} </span></p>
                                        <p>Date mise en circulation : <span>{user.date} </span></p>
                                    </div> 
                                    <Heart />
                                </div>
                            </div>
                            )
                })}
            </div>
        </div>
    )
}