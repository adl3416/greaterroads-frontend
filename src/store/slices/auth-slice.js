import { createSlice } from "@reduxjs/toolkit";

 export const authSlice=createSlice({
     name:"auth",
     initialState:{
          user:{},    //firstName: "Ali", lastName:"Gel" , roles: ["Administrator"]
          isUserLogin:false
     },

     reducers:{
          loginSuccess: (state, action)=>{     // login in basarili olmasi durumu, backend e baglaniyoruz action yani disardan gelen name ile backendekini esitliyoruz problem yoksa eger true
               state.user = action.payload;
               state.isUserLogin=true;
          }, 

          loginFailed: (state)=>{   // login basarisiz
               state.isUserLogin=false; 
          },
          logout: (state) =>{
               state.user = {}; // mevcut state bosalt
               state.isUserLogin=false;
          }, 

          userUpdate : (state, action)=>{  //kullani guncellenince profildede guncellencek
               state.user = action.payload;
             }

          
     },  
 });

 export const {loginSuccess,loginFailed,logout,userUpdate} =authSlice.actions;
 export default authSlice.reducer;