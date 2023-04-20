import { createSlice } from "@reduxjs/toolkit"
import { useState } from "react"

const initialState = {
    isOpen: false
}
export const signUpModalSlice = createSlice({
    name: "signUpModal",
    initialState,
    reducers:{
        toggleSignUpModal : (state) => {
            state.isOpen = !state.isOpen
        },
       
    }
})

export const { toggleSignUpModal} = signUpModalSlice.actions

export default signUpModalSlice.reducer