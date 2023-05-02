import {CartIcon } from "../icons"
import { useSelector } from "react-redux"
import { toggleSignUpModal } from "../features/signUpModal/SignUpModalSlice"
import { toggleSignInModal } from "../features/signInModal/signInModalSlice"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { signOut } from 'firebase/auth'
import { auth } from "../firebase-config"
import { setCurrentUser } from "../features/auth/authSlice"

//import { QueryClient } from 'react-query';

const Navbar = () => {
    const dispatch = useDispatch()
    const{ amount } = useSelector((store ) => store.cart)
    const { main, isLoading } = useSelector((store) => store.weather)
    const { signInIsOpen } = useSelector((store) => store.signInModal)
    const { signUpIsOpen } = useSelector((store) => store.signUpModal) 
    const {currentUser, loading} = useSelector((store) => store.auth)
    
    const logOut = async () => {
        try {
            await signOut(auth)
            dispatch(setCurrentUser(null))
        } catch {
            console.log("for somme reason, we can't deconnect. Please check your internet connection and retry")
        }
    }
    return (
        <nav>
            <div className="nav-center">
                <div className="nav-logo">
                    {isLoading.isLoading ? (
                        <div className="nav-temp">Loading...</div>
                        ) : (
                        <div className="nav-temp">{(300 - main.temp).toFixed(2)}°</div>                       
                    )}
                     <NavLink to="/" >
                        <h3>redux toolkit</h3>
                    </NavLink>
                </div>
                <div className="searchBar">
                    <input type="text" placeholder="rechercher"/>
                </div>
                <div className="nav-nav">
                    <div className="nav-link"> 
                        {/* <NavLink to="about">
                            <button className="nav-btn btn">About</button>
                        </NavLink> */}
                        <NavLink to="/private">
                            <button className="nav-btn btn">Déposer une annonce</button>
                        </NavLink>
                    </div> 
                    <div className="nav-container">                                                             
                        <div className="nav-btns">
                            {/* si on n'est pas connecté  */}
                            {!currentUser ? (
                            <>  {/* si signInModal est déjà ouvert */}
                                {signInIsOpen ? (
                                    <button 
                                    className="nav-btn btn"  
                                >
                                    SignUp
                                </button>
                                ) : (
                                    <button 
                                        className="nav-btn btn" 
                                        onClick={() => {dispatch(toggleSignUpModal())}}
                                    >
                                        SignUp
                                    </button>
                                )}
                                {/* si signUpModal est déjà ouvert */}
                                {signUpIsOpen ? (<button 
                                    className="nav-btn btn"
                                >
                                    SignIn
                                </button>) : (
                                    <button 
                                        className="nav-btn btn"
                                        onClick={() => {dispatch(toggleSignInModal())}}
                                    >
                                        SignIn
                                    </button>
                                )}
                            </>
                            ) : (
                                <button 
                                    className="nav-btn btn"
                                    onClick={() => {logOut()}}
                                >
                                    LogOut
                                </button>
                            )}
                                
                        </div>
                        <div className="amount-container">
                            <CartIcon />
                            <p className="total-amount">{amount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        
    )
}

export default Navbar