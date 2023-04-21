import { createSlice } from "@reduxjs/toolkit"
import { useState } from "react"

const initialState = {
    signUpIsOpen: false,
}
export const signUpModalSlice = createSlice({
    name: "signUpModal",
    initialState,
    reducers:{
        toggleSignUpModal : (state) => {
            state.signUpIsOpen = !state.signUpIsOpen
        },
    }
})

export const { toggleSignUpModal } = signUpModalSlice.actions

export default signUpModalSlice.reducer