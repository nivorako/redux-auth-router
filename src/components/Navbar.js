import {CartIcon } from "../icons"
import { useSelector } from "react-redux"


const Navbar = () => {

    const{ amount } = useSelector((store ) => store.cart)
    const { main, isLoading } = useSelector((store) => store.weather)
    
    return (
        <nav>
            <div className="nav-center">
                <h3>redux toolkit</h3>
                <div className="nav-container">
                    
                    <CartIcon />
                    <div className="amount-container">
                        <p className="total-amount">{amount}</p>
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