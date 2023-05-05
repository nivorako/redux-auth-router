import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function UserNavBar() {
    const {currentUser} = useSelector((store) => (store.auth))
    if(currentUser) {
        return ( 
            <div className='userNavBar'>
                <div className='userNavBar-link'>
                    <NavLink to="/private">
                        <button className="nav-btn btn">Déposer une annonce</button>
                    </NavLink>
                    <NavLink to="/private">
                        <button className="nav-btn btn">Consulter vos annonce</button>
                    </NavLink>
                </div>
                <p>Bonjour {currentUser.email.split("@")[0].split(".")[0]}</p> 
            </div>
          )
    }
}

export default UserNavBar
