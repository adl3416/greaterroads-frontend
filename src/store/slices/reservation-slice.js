import { createSlice } from "@reduxjs/toolkit";



export const reservationSlice = createSlice({
    name: "reservation",
    initialState: {
        vehicle: null,
        reservation:null
    },
    reducers:{
        setVehicle: (state, action)=>{ // backenden data gelcegi icin action koyulur
            state.vehicle = action.payload; // burasi backenden gelen bilgileri yukaridaki vehicle  nin icine yerlestircek
        },
        setReservation: (state ,action)=> {
            state.reservation =action.payload;  // burasida 9.satridaki reservation un icine, kullanicidan gelen bilgileri yerlestircek
        }
    }
})                 //en sonunda birlestirip backende göndercez 

export const{ setVehicle, setReservation} = reservationSlice
export default reservationSlice.reducer;  //slices klasörundeki index.js eklemeyi unutmuyoruz