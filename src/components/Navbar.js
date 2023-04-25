import {CartIcon } from "../icons"
import { useSelector } from "react-redux"
import { toggleSignUpModal } from "../features/signUpModal/SignUpModalSlice"
import { toggleSignInModal } from "../features/signInModal/signInModalSlice"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"

const Navbar = () => {
    const dispatch = useDispatch()
    const{ amount } = useSelector((store ) => store.cart)
    const { main, isLoading } = useSelector((store) => store.weather)
    const { signInIsOpen } = useSelector((store) => store.signInModal)
    const { signUpIsOpen } = useSelector((store) => store.signUpModal) 
    
    return (
        <nav>
            <div className="nav-center">
                <NavLink to="/" >
                    <h3>redux toolkit</h3>
                </NavLink>
                <div className="nav-link"> 
                    <NavLink to="about">
                        <button className="nav-btn btn">About</button>
                    </NavLink>
                </div> 
                <div className="nav-container">                                      
                    <div className="amount-container">
                        <CartIcon />
                        <p className="total-amount">{amount}</p>
                    </div>
                    <div className="nav-btns">
                        {/* si signInModal est déjà ouvert */}
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
                    </div>
                </div>
                
            </div>
                        {isLoading.isLoading ? (
                <div className="nav-temp">Loading...</div>
                ) : (
                <div className="nav-temp">{(300 - main.temp).toFixed(2)}°</div>
                )}
        </nav>
        
    )
}

export default Navbar