import {CartIcon } from "../icons"
import { useSelector } from "react-redux"
import { toggleSignUpModal } from "../features/signUpModal/SignUpModalSlice"
import { useDispatch } from "react-redux"


const Navbar = () => {
    const dispatch = useDispatch()
    const{ amount } = useSelector((store ) => store.cart)
    const { main, isLoading } = useSelector((store) => store.weather)
    
    return (
        <nav>
            <div className="nav-center">
                <h3>redux toolkit</h3>
                <div className="nav-container">
                    
                    
                    <div className="amount-container">
                        <CartIcon />
                        <p className="total-amount">{amount}</p>
                    </div>
                    <div className="nav-btns">
                        <button 
                            className="nav-btn btn" 
                            onClick={() => {dispatch(toggleSignUpModal())}}
                        >
                            SignUp
                        </button>
                        <button className="nav-btn btn">SignIn</button>
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