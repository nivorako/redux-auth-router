import { createSlice } from "@reduxjs/toolkit"
import { auth } from "../../firebase-config"


const initialState = {
    signInIsOpen: false, 
}

export const signInModalSlice = createSlice({
    name: "sgnInModal",
    initialState,
    reducers:{
        toggleSignInModal : (state) => {
            state.signInIsOpen = !state.signInIsOpen
        },
    },
    
})

export const {toggleSignInModal} = signInModalSlice.actions

export default signInModalSlice.reducer