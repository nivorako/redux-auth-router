import { configureStore  } from "@reduxjs/toolkit"
import cartReducer from "./features/cart/cartSlice"
import modalReducer from "./features/modal/modalSlice"
import weatherReducer from "./features/weather/weatherSlice"
import signUpModalReducer from "./features/signUpModal/SignUpModalSlice"
import signInModalReducer from "./features/signInModal/signInModalSlice"
import authReducer from "./features/auth/authSlice"

//import { authMiddleware } from "./middlewares/updateCurrentUserMiddleware"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalReducer,
        weather: weatherReducer,
        signUpModal: signUpModalReducer,
        signInModal: signInModalReducer,
        auth: authReducer
    },
   // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),

})
