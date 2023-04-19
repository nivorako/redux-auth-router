import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./features/cart/cartSlice"
import modalReducer from "./features/modal/modalSlice"
import weatherReducer from "./features/weather/weatherSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalReducer,
        weather: weatherReducer
    },
})
