import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signInIsOpen: false
}

export const signInModalSlice = createSlice({
    name: "sgnInModal",
    initialState,
    reducers:{
        toggleSignInModal : (state) => {
            state.signInIsOpen = !state.signInIsOpen
        }
    }
})

export const {toggleSignInModal} = signInModalSlice.actions

export default signInModalSlice.reducer