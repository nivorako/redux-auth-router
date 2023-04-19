import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {produce} from "immer"

const url = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=644adbaa1b1205f0e353469d66ccbcf4"

const initialState = {
    coord:{
        lon:0,
        lat:0
    },
    base:"",
    main:{
        temp:0,
        feels_like:0,
        temp_min:0,
        temp_max:0,
        pressure:0,
        humidity:0
    },
    isLoading: { isLoading: true }
}

export const getWeather = createAsyncThunk("weather/getWeather", async () => {
    const res = await fetch(url);
    try {
        const resultat = await res.json();
        return resultat
    }   catch (err) {
        return console.error("error :", err);
    }
})

const weatherSlice = createSlice({
    name:"weather",
    initialState,
    extraReducers:{
        [getWeather.pending] : (state) => (
            produce(state, draftState => {
                draftState.isLoading = { isLoading: true };
            })
        ),
        [getWeather.fulfilled] : (state, action) => (
            produce(state, draftState => {
                draftState.isLoading = { isLoading: false };
                draftState.main.temp = action.payload.main.temp;
            })
        ),
        [getWeather.rejected] : (state) => (
            produce(state, draftState => {
                draftState.isLoading = { isLoading: false };
            })
        )
    }
})

export default weatherSlice.reducer