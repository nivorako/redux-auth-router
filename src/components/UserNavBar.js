import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { UserIcon } from '../icons'

function UserNavBar() {
    let { userId } = useParams();
    //console.log('userId :', userId)
    const {currentUser} = useSelector((store) => (store.auth))
    if(currentUser) {
        return ( 
            <div className='userNavBar'>
                <div className='userNavBar-link'>
                    <NavLink to="/private">
                        <button className="nav-btn btn">Déposer une annonce</button>
                    </NavLink>
                    <NavLink to="/private/Update/1">
                        <button className="nav-btn btn">Consulter vos annonce</button>
                    </NavLink>
                </div>
                <div className='userNavBar-profil'>
                    <NavLink 
                        to="/private/Profil/1" 
                        className="navProfil-link"
                    >
                        Bonjour {currentUser.email.split("@")[0].split(".")[0]}
                    </NavLink> 
                    <UserIcon width={20} height={20}/>
                </div>
            </div>
          )
    }
}

export default UserNavBar
